"""
FilmFlow AI - Modal.com Backend

Serverless GPU compute for AI generation tasks.
Uses Modal.com free tier ($30/month).
"""

import modal
from modal import Image, App, Secret
import os

# Define the Modal app
app = App("filmflow-ai")

# Build the container image with required dependencies
image = Image.debian_slim(python_version="3.11").pip_install(
    "higgsfield-client",
    "elevenlabs",
    "httpx",
    "pydantic",
    "fastapi",
)

# =====================================================
# STORYBOARD GENERATION (Image)
# =====================================================

@app.function(
    image=image,
    secrets=[Secret.from_name("filmflow-secrets")],
    timeout=300,
)
def generate_storyboard(
    prompt: str,
    actor_refs: list[str] = None,
    resolution: str = "2K",
    aspect_ratio: str = "16:9",
    model: str = "bytedance/seedream/v4/text-to-image",
) -> dict:
    """
    Generate a storyboard image using Higgsfield.

    Args:
        prompt: Scene description for image generation
        actor_refs: Optional list of actor reference image URLs
        resolution: Image resolution (720p, 2K, 4K)
        aspect_ratio: Aspect ratio (16:9, 4:3, 1:1, 9:16)
        model: Higgsfield model ID

    Returns:
        dict with image URL and metadata
    """
    import higgsfield_client

    try:
        arguments = {
            "prompt": prompt,
            "resolution": resolution,
            "aspect_ratio": aspect_ratio,
        }

        if actor_refs and len(actor_refs) > 0:
            arguments["image_reference"] = actor_refs[0]

        result = higgsfield_client.subscribe(model, arguments=arguments)

        return {
            "success": True,
            "image_url": result.get("images", [{}])[0].get("url"),
            "model": model,
            "prompt": prompt,
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "model": model,
        }


# =====================================================
# VIDEO GENERATION
# =====================================================

@app.function(
    image=image,
    secrets=[Secret.from_name("filmflow-secrets")],
    timeout=600,
    gpu="T4",
)
def generate_video(
    image_url: str,
    camera_movement: str = None,
    duration: int = 5,
    model: str = "kuaishou/kling-2.6",
    audio_prompt: str = None,
) -> dict:
    """
    Generate a video from an image using Higgsfield.

    Args:
        image_url: Source storyboard image URL
        camera_movement: Camera movement prompt (e.g., "dolly in")
        duration: Video duration in seconds (5-10)
        model: Higgsfield video model ID
        audio_prompt: Optional audio/dialogue prompt

    Returns:
        dict with video URL and metadata
    """
    import higgsfield_client

    try:
        arguments = {
            "image_url": image_url,
            "duration": min(duration, 10),  # Cap at 10 seconds
        }

        if camera_movement:
            arguments["camera_movement"] = camera_movement

        if audio_prompt:
            arguments["audio_prompt"] = audio_prompt

        result = higgsfield_client.subscribe(model, arguments=arguments)

        return {
            "success": True,
            "video_url": result.get("video_url"),
            "duration": duration,
            "model": model,
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "model": model,
        }


# =====================================================
# SLOVAK TTS (ElevenLabs)
# =====================================================

@app.function(
    image=image,
    secrets=[Secret.from_name("filmflow-secrets")],
    timeout=120,
)
def generate_slovak_audio(
    text: str,
    voice_id: str = None,
    model: str = "eleven_multilingual_v2",
    stability: float = 0.5,
    similarity_boost: float = 0.8,
    style: float = 0.6,
) -> dict:
    """
    Generate Slovak speech using ElevenLabs.

    Args:
        text: Slovak text to synthesize
        voice_id: ElevenLabs voice ID
        model: ElevenLabs model ID
        stability: Voice stability (0-1)
        similarity_boost: Voice similarity (0-1)
        style: Emotion/style intensity (0-1)

    Returns:
        dict with audio data and metadata
    """
    from elevenlabs import ElevenLabs
    import base64

    try:
        client = ElevenLabs(api_key=os.environ.get("ELEVENLABS_API_KEY"))

        # Use default voice if none provided
        if not voice_id:
            voice_id = os.environ.get("ELEVENLABS_DEFAULT_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")

        audio = client.text_to_speech.convert(
            text=text,
            voice_id=voice_id,
            model_id=model,
            voice_settings={
                "stability": stability,
                "similarity_boost": similarity_boost,
                "style": style,
            },
        )

        # Convert audio to base64 for transfer
        audio_bytes = b"".join(chunk for chunk in audio)
        audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")

        return {
            "success": True,
            "audio_base64": audio_base64,
            "text": text,
            "character_count": len(text),
            "voice_id": voice_id,
            "model": model,
        }
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "text": text,
        }


# =====================================================
# WEBHOOK HANDLER (Called internally, no web endpoint)
# =====================================================

@app.function(
    image=image,
    secrets=[Secret.from_name("filmflow-secrets")],
)
def webhook_handler(request: dict) -> dict:
    """
    Handle Higgsfield webhook callbacks.

    This endpoint receives generation completion notifications
    and can update the database or trigger follow-up actions.
    """
    import httpx

    event = request.get("event")
    job_id = request.get("job_id")
    result = request.get("result")

    # Forward to Next.js API for database update
    app_url = os.environ.get("NEXT_PUBLIC_APP_URL", "http://localhost:3000")

    try:
        httpx.post(
            f"{app_url}/api/webhooks/modal",
            json={
                "event": event,
                "job_id": job_id,
                "result": result,
            },
            headers={
                "X-Webhook-Secret": os.environ.get("MODAL_WEBHOOK_SECRET", ""),
            },
        )
    except Exception as e:
        print(f"Failed to forward webhook: {e}")

    return {"received": True, "job_id": job_id}


# =====================================================
# HEALTH CHECK (Called internally, no web endpoint)
# =====================================================

@app.function(image=image)
def health() -> dict:
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "filmflow-ai",
        "version": "1.0.0",
    }


# =====================================================
# LOCAL TESTING
# =====================================================

@app.local_entrypoint()
def main():
    """Test the functions locally."""
    print("Testing FilmFlow AI Modal Backend...")

    # Test storyboard generation
    result = generate_storyboard.remote(
        prompt="Slovak woman, dramatic lighting, cinema scene",
        resolution="2K",
    )
    print(f"Storyboard result: {result}")
