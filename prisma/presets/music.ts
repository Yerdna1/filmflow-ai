/**
 * Music Presets for FilmFlow AI
 * Suno AI soundtrack generation prompts
 */

export const musicPresets = [
  // ==========================================
  // DRAMATIC SCORES
  // ==========================================
  {
    category: 'dramatic',
    name: 'Dramatické napätie',
    nameSk: 'Dramatické napätie',
    description: 'Tense dramatic underscore for confrontation scenes',
    prompt: 'Orchestral dramatic tension, strings tremolo, low brass sustains, building suspense, minor key, slow tempo, cinematic film score, Eastern European influence, emotional depth',
    genre: 'orchestral',
    mood: 'tense',
    tempo: 'slow',
    instruments: ['strings', 'brass', 'timpani'],
    duration: 60,
    tags: ['napätie', 'dráma', 'konfrontácia'],
  },
  {
    category: 'dramatic',
    name: 'Odhalenie tajomstva',
    nameSk: 'Odhalenie tajomstva',
    description: 'Mysterious reveal music',
    prompt: 'Mysterious orchestral piece, solo piano introduction, building strings, revelation moment, minor to major transition, cinematic, emotional climax, film score style',
    genre: 'orchestral',
    mood: 'mysterious',
    tempo: 'medium',
    instruments: ['piano', 'strings', 'choir'],
    duration: 90,
    tags: ['tajomstvo', 'odhalenie', 'mysteriózne'],
  },
  {
    category: 'dramatic',
    name: 'Vnútorný konflikt',
    nameSk: 'Vnútorný konflikt',
    description: 'Internal struggle and emotional turmoil',
    prompt: 'Emotional orchestral piece, conflicted feeling, cello solo with string ensemble, minor key, dynamic shifts, introspective, cinematic film score, melancholic undertones',
    genre: 'orchestral',
    mood: 'conflicted',
    tempo: 'moderate',
    instruments: ['cello', 'strings', 'piano'],
    duration: 75,
    tags: ['konflikt', 'emócie', 'introspekcia'],
  },

  // ==========================================
  // ROMANTIC SCORES
  // ==========================================
  {
    category: 'romantic',
    name: 'Prvá láska',
    nameSk: 'Prvá láska',
    description: 'Young love theme, innocent and hopeful',
    prompt: 'Romantic orchestral theme, solo violin melody, gentle piano accompaniment, string section swells, major key, tender and innocent, nostalgic, cinematic love theme, Eastern European folk influence',
    genre: 'orchestral',
    mood: 'romantic',
    tempo: 'moderate',
    instruments: ['violin', 'piano', 'strings'],
    duration: 90,
    tags: ['láska', 'romantika', 'nežnosť'],
  },
  {
    category: 'romantic',
    name: 'Západ slnka vo viniciach',
    nameSk: 'Západ slnka vo viniciach',
    description: 'Golden hour romantic ambiance',
    prompt: 'Warm romantic orchestral piece, golden sunset feeling, gentle acoustic guitar, strings, pastoral atmosphere, Slovak folk influence, cinematic, heartwarming, major key with minor moments',
    genre: 'orchestral-folk',
    mood: 'warm',
    tempo: 'slow',
    instruments: ['guitar', 'strings', 'flute'],
    duration: 120,
    tags: ['západ slnka', 'vinice', 'romantika'],
  },
  {
    category: 'romantic',
    name: 'Sľub lásky',
    nameSk: 'Sľub lásky',
    description: 'Proposal/commitment theme',
    prompt: 'Emotional romantic climax, full orchestra swell, triumphant love theme, major key, soaring melody, cinematic wedding scene music, heartfelt, piano and strings duet building to full orchestra',
    genre: 'orchestral',
    mood: 'triumphant',
    tempo: 'building',
    instruments: ['full orchestra', 'piano', 'choir'],
    duration: 90,
    tags: ['svadba', 'láska', 'sľub'],
  },

  // ==========================================
  // MELANCHOLIC SCORES
  // ==========================================
  {
    category: 'melancholic',
    name: 'Spomienky',
    nameSk: 'Spomienky',
    description: 'Nostalgic memories theme',
    prompt: 'Melancholic piano solo with gentle strings, nostalgic feeling, bittersweet memories, minor key, slow tempo, cinematic, introspective, Eastern European melancholy',
    genre: 'orchestral',
    mood: 'nostalgic',
    tempo: 'slow',
    instruments: ['piano', 'strings'],
    duration: 75,
    tags: ['spomienky', 'nostalgické', 'smútok'],
  },
  {
    category: 'melancholic',
    name: 'Stratená láska',
    nameSk: 'Stratená láska',
    description: 'Lost love and regret',
    prompt: 'Sad orchestral piece, mournful cello solo, gentle piano, strings in minor key, emotional depth, sense of loss and regret, cinematic, tearful, slow tempo',
    genre: 'orchestral',
    mood: 'sad',
    tempo: 'slow',
    instruments: ['cello', 'piano', 'strings'],
    duration: 90,
    tags: ['strata', 'smútok', 'ľútosť'],
  },
  {
    category: 'melancholic',
    name: 'Pohreb',
    nameSk: 'Pohreb',
    description: 'Funeral scene music',
    prompt: 'Somber funeral music, slow procession, organ undertones, muted strings, minor key, dignified grief, cinematic, Eastern European Orthodox influence, choir humming',
    genre: 'orchestral-sacred',
    mood: 'somber',
    tempo: 'very slow',
    instruments: ['organ', 'strings', 'choir'],
    duration: 120,
    tags: ['pohreb', 'smútok', 'rozlúčka'],
  },

  // ==========================================
  // HOPEFUL/UPLIFTING SCORES
  // ==========================================
  {
    category: 'hopeful',
    name: 'Nový začiatok',
    nameSk: 'Nový začiatok',
    description: 'New beginnings and hope',
    prompt: 'Uplifting orchestral piece, hopeful melody, major key, building from solo piano to full strings, sunrise feeling, cinematic, emotional release, new chapter beginning',
    genre: 'orchestral',
    mood: 'hopeful',
    tempo: 'moderate-building',
    instruments: ['piano', 'strings', 'horns'],
    duration: 90,
    tags: ['nádej', 'začiatok', 'optimizmus'],
  },
  {
    category: 'hopeful',
    name: 'Odpustenie',
    nameSk: 'Odpustenie',
    description: 'Forgiveness and reconciliation',
    prompt: 'Emotional orchestral piece, cathartic release, minor to major key change, strings and piano duet, tears of joy, cinematic forgiveness theme, heartwarming resolution',
    genre: 'orchestral',
    mood: 'cathartic',
    tempo: 'moderate',
    instruments: ['piano', 'strings', 'oboe'],
    duration: 75,
    tags: ['odpustenie', 'uzmierenie', 'úľava'],
  },
  {
    category: 'hopeful',
    name: 'Domov',
    nameSk: 'Domov',
    description: 'Coming home theme',
    prompt: 'Warm orchestral homecoming theme, gentle folk elements, Slovak musical influence, acoustic guitar and strings, nostalgic yet hopeful, cinematic, sense of belonging, major key',
    genre: 'orchestral-folk',
    mood: 'warm',
    tempo: 'moderate',
    instruments: ['guitar', 'strings', 'flute', 'accordion'],
    duration: 90,
    tags: ['domov', 'návrat', 'rodina'],
  },

  // ==========================================
  // SLOVAK FOLK-INSPIRED
  // ==========================================
  {
    category: 'folk',
    name: 'Slovenská dedina',
    nameSk: 'Slovenská dedina',
    description: 'Slovak village atmosphere',
    prompt: 'Slovak folk music inspired orchestral piece, fujara flute, traditional harmonies, pastoral atmosphere, Carpathian mountains feeling, cinematic, authentic Slovak sound, gentle tempo',
    genre: 'folk-orchestral',
    mood: 'pastoral',
    tempo: 'moderate',
    instruments: ['fujara', 'strings', 'accordion', 'cimbalom'],
    duration: 75,
    tags: ['folklór', 'dedina', 'tradície'],
  },
  {
    category: 'folk',
    name: 'Vinobranie',
    nameSk: 'Vinobranie',
    description: 'Wine harvest celebration',
    prompt: 'Festive Slovak folk music, wine harvest celebration, cimbalom and accordion, dancing rhythm, joyful atmosphere, traditional Slovak elements, cinematic, celebratory',
    genre: 'folk',
    mood: 'festive',
    tempo: 'upbeat',
    instruments: ['cimbalom', 'accordion', 'violin', 'bass'],
    duration: 60,
    tags: ['vinobranie', 'oslava', 'radosť'],
  },
  {
    category: 'folk',
    name: 'Babičkina pieseň',
    nameSk: 'Babičkina pieseň',
    description: 'Grandmother\'s lullaby/folk song',
    prompt: 'Gentle Slovak lullaby, solo female voice humming, simple piano accompaniment, nostalgic, grandmother singing to child, cinematic, intimate, tearful beauty, slow tempo',
    genre: 'folk-vocal',
    mood: 'tender',
    tempo: 'slow',
    instruments: ['voice', 'piano'],
    duration: 90,
    tags: ['babička', 'pieseň', 'nostalgické'],
  },

  // ==========================================
  // AMBIENT/ATMOSPHERIC
  // ==========================================
  {
    category: 'ambient',
    name: 'Ranná hmla',
    nameSk: 'Ranná hmla',
    description: 'Morning mist atmosphere',
    prompt: 'Ambient atmospheric music, morning mist in Slovak countryside, gentle pads, distant church bells, ethereal, cinematic, sparse arrangement, nature sounds undertones',
    genre: 'ambient',
    mood: 'ethereal',
    tempo: 'very slow',
    instruments: ['synth pads', 'bells', 'ambient textures'],
    duration: 120,
    tags: ['ráno', 'hmla', 'atmosféra'],
  },
  {
    category: 'ambient',
    name: 'Nočný pokoj',
    nameSk: 'Nočný pokoj',
    description: 'Night time peaceful ambiance',
    prompt: 'Peaceful night ambient music, crickets, gentle piano notes, stars, quiet countryside, cinematic, meditative, soft strings sustains, Slovak summer night feeling',
    genre: 'ambient',
    mood: 'peaceful',
    tempo: 'very slow',
    instruments: ['piano', 'ambient pads', 'nature sounds'],
    duration: 120,
    tags: ['noc', 'pokoj', 'ticho'],
  },

  // ==========================================
  // TITLE/CREDITS MUSIC
  // ==========================================
  {
    category: 'credits',
    name: 'Úvodná téma',
    nameSk: 'Úvodná téma',
    description: 'Opening title sequence music',
    prompt: 'Cinematic opening title music, establishing theme, orchestral, minor to major progression, building anticipation, Slovak folk elements, film score, memorable main melody',
    genre: 'orchestral',
    mood: 'anticipatory',
    tempo: 'building',
    instruments: ['full orchestra'],
    duration: 120,
    tags: ['titulky', 'úvod', 'téma'],
  },
  {
    category: 'credits',
    name: 'Záverečná téma',
    nameSk: 'Záverečná téma',
    description: 'End credits music',
    prompt: 'Cinematic end credits music, triumphant resolution of main theme, full orchestra, major key, emotional satisfaction, recap of musical themes, uplifting ending, cinematic film score finale',
    genre: 'orchestral',
    mood: 'triumphant',
    tempo: 'moderate-building',
    instruments: ['full orchestra', 'choir'],
    duration: 180,
    tags: ['titulky', 'záver', 'finále'],
  },
]

// Music moods for quick selection
export const musicMoods = [
  { id: 'tense', name: 'Napäté', nameSk: 'Napäté', color: '#dc2626' },
  { id: 'romantic', name: 'Romantické', nameSk: 'Romantické', color: '#ec4899' },
  { id: 'sad', name: 'Smutné', nameSk: 'Smutné', color: '#6366f1' },
  { id: 'hopeful', name: 'Nádejné', nameSk: 'Nádejné', color: '#22c55e' },
  { id: 'mysterious', name: 'Záhadné', nameSk: 'Záhadné', color: '#8b5cf6' },
  { id: 'triumphant', name: 'Triumfálne', nameSk: 'Triumfálne', color: '#f59e0b' },
  { id: 'nostalgic', name: 'Nostalgické', nameSk: 'Nostalgické', color: '#78716c' },
  { id: 'peaceful', name: 'Pokojné', nameSk: 'Pokojné', color: '#06b6d4' },
  { id: 'festive', name: 'Slávnostné', nameSk: 'Slávnostné', color: '#eab308' },
  { id: 'ethereal', name: 'Éterické', nameSk: 'Éterické', color: '#a855f7' },
]

// Instrument presets for soundtrack
export const instrumentSets = {
  fullOrchestra: {
    name: 'Plný orchester',
    instruments: ['strings', 'brass', 'woodwinds', 'percussion', 'harp'],
  },
  chamberStrings: {
    name: 'Sláčikový komorný',
    instruments: ['violin', 'viola', 'cello', 'bass'],
  },
  pianoStrings: {
    name: 'Klavír a sláčiky',
    instruments: ['piano', 'strings'],
  },
  folkEnsemble: {
    name: 'Folklórny súbor',
    instruments: ['fujara', 'cimbalom', 'accordion', 'violin', 'bass'],
  },
  ambient: {
    name: 'Ambientný',
    instruments: ['synth pads', 'piano', 'ambient textures'],
  },
}
