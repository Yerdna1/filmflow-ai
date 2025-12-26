export interface CameraMovement {
  id: string
  name: string
  nameSk: string
  category: 'DOLLY' | 'CRANE' | 'TRACKING' | 'HANDHELD' | 'STATIC' | 'SPECIAL'
  description: string
  descriptionSk: string
  prompt: string
  dramaticUse: string
  emotionalEffect: string
  previewUrl?: string
}

export const CAMERA_MOVEMENTS: CameraMovement[] = [
  // DOLLY
  {
    id: 'dolly_in',
    name: 'Dolly In',
    nameSk: 'Priblíženie',
    category: 'DOLLY',
    description: 'Camera moves towards the subject',
    descriptionSk: 'Kamera sa približuje k subjektu',
    prompt: 'smooth dolly in movement, camera pushing forward towards subject',
    dramaticUse: 'Odhalenie emócií, zvýšenie napätia, intimita',
    emotionalEffect: 'Zvyšuje intenzitu, vytvára intimitu',
  },
  {
    id: 'dolly_out',
    name: 'Dolly Out',
    nameSk: 'Oddialenie',
    category: 'DOLLY',
    description: 'Camera moves away from the subject',
    descriptionSk: 'Kamera sa vzďaľuje od subjektu',
    prompt: 'smooth dolly out movement, camera pulling back from subject',
    dramaticUse: 'Odhalenie kontextu, izolácia postavy',
    emotionalEffect: 'Vytvára odstup, pocit opustenosti',
  },
  {
    id: 'dolly_zoom',
    name: 'Dolly Zoom (Vertigo)',
    nameSk: 'Vertigo efekt',
    category: 'DOLLY',
    description: 'Camera moves while zooming opposite direction',
    descriptionSk: 'Kamera sa hýbe pri súčasnom zoomovaní',
    prompt: 'dolly zoom vertigo effect, background shifts while subject stays same size',
    dramaticUse: 'Šok, realizácia, psychologický zlom',
    emotionalEffect: 'Dezorientácia, šok, zjavenie',
  },

  // CRANE
  {
    id: 'crane_up',
    name: 'Crane Up',
    nameSk: 'Žeriav hore',
    category: 'CRANE',
    description: 'Camera rises vertically',
    descriptionSk: 'Kamera stúpa vertikálne',
    prompt: 'crane shot rising up, camera elevating smoothly',
    dramaticUse: 'Záverečné scény, triumf, únik',
    emotionalEffect: 'Oslobodenie, transcendencia, epickosť',
  },
  {
    id: 'crane_down',
    name: 'Crane Down',
    nameSk: 'Žeriav dole',
    category: 'CRANE',
    description: 'Camera descends vertically',
    descriptionSk: 'Kamera klesá vertikálne',
    prompt: 'crane shot descending, camera lowering smoothly',
    dramaticUse: 'Úvodné scény, príchod do lokácie',
    emotionalEffect: 'Uvedenie do deja, intimita',
  },

  // TRACKING
  {
    id: 'tracking_left',
    name: 'Tracking Left',
    nameSk: 'Jazda vľavo',
    category: 'TRACKING',
    description: 'Camera moves parallel to the left',
    descriptionSk: 'Kamera sa pohybuje paralelne vľavo',
    prompt: 'smooth tracking shot moving left, lateral camera movement',
    dramaticUse: 'Sledovanie pohybu, odhalenie prostredia',
    emotionalEffect: 'Plynulosť, kontinuita',
  },
  {
    id: 'tracking_right',
    name: 'Tracking Right',
    nameSk: 'Jazda vpravo',
    category: 'TRACKING',
    description: 'Camera moves parallel to the right',
    descriptionSk: 'Kamera sa pohybuje paralelne vpravo',
    prompt: 'smooth tracking shot moving right, lateral camera movement',
    dramaticUse: 'Sledovanie pohybu, odhalenie prostredia',
    emotionalEffect: 'Plynulosť, kontinuita',
  },
  {
    id: 'orbit_360',
    name: '360° Orbit',
    nameSk: '360° Orbit',
    category: 'TRACKING',
    description: 'Camera orbits completely around subject',
    descriptionSk: 'Kamera obieha okolo subjektu',
    prompt: '360 degree orbit shot, camera circling around subject',
    dramaticUse: 'Dôležité momenty, konfrontácie',
    emotionalEffect: 'Intenzita, uzáver, epickosť',
  },

  // HANDHELD
  {
    id: 'handheld_subtle',
    name: 'Subtle Handheld',
    nameSk: 'Jemný handheld',
    category: 'HANDHELD',
    description: 'Slight natural camera movement',
    descriptionSk: 'Jemný prirodzený pohyb kamery',
    prompt: 'subtle handheld camera movement, slight organic motion',
    dramaticUse: 'Dokumentárny štýl, autenticita',
    emotionalEffect: 'Realizmus, intimita',
  },
  {
    id: 'handheld_shaky',
    name: 'Shaky Handheld',
    nameSk: 'Trasúci sa handheld',
    category: 'HANDHELD',
    description: 'Pronounced shaky camera',
    descriptionSk: 'Výrazný trasúci sa pohyb',
    prompt: 'shaky handheld camera, nervous unstable movement',
    dramaticUse: 'Chaos, panika, akčné scény',
    emotionalEffect: 'Nepokoj, napätie, chaos',
  },

  // STATIC
  {
    id: 'static_wide',
    name: 'Static Wide',
    nameSk: 'Statický celok',
    category: 'STATIC',
    description: 'Fixed wide shot, no movement',
    descriptionSk: 'Statický celkový záber',
    prompt: 'static wide shot, locked off camera, no movement',
    dramaticUse: 'Úvodné scény, kontemplácia',
    emotionalEffect: 'Pokoj, napätie v nehybnosti',
  },
  {
    id: 'static_closeup',
    name: 'Static Close-up',
    nameSk: 'Statický detail',
    category: 'STATIC',
    description: 'Fixed close-up shot',
    descriptionSk: 'Statický detailný záber',
    prompt: 'static close-up shot, locked camera on face or detail',
    dramaticUse: 'Emócie, reakcie, dôležité momenty',
    emotionalEffect: 'Intenzita, intimita, fokus',
  },

  // SPECIAL
  {
    id: 'slow_motion',
    name: 'Slow Motion',
    nameSk: 'Spomalený záber',
    category: 'SPECIAL',
    description: 'Slowed down footage',
    descriptionSk: 'Spomalené video',
    prompt: 'slow motion footage, time stretched, dramatic slow movement',
    dramaticUse: 'Dôležité momenty, emočné vrcholy',
    emotionalEffect: 'Dráma, dôležitosť momentu',
  },
  {
    id: 'whip_pan',
    name: 'Whip Pan',
    nameSk: 'Rýchla panoráma',
    category: 'SPECIAL',
    description: 'Very fast horizontal pan',
    descriptionSk: 'Veľmi rýchly horizontálny pohyb',
    prompt: 'whip pan, fast horizontal camera movement with motion blur',
    dramaticUse: 'Prestrih medzi scénami, šok',
    emotionalEffect: 'Energia, prekvapenie, rýchlosť',
  },
  {
    id: 'dutch_angle',
    name: 'Dutch Angle',
    nameSk: 'Šikmý záber',
    category: 'SPECIAL',
    description: 'Tilted camera angle',
    descriptionSk: 'Naklonený uhol kamery',
    prompt: 'dutch angle tilted camera, canted frame',
    dramaticUse: 'Nepokoj, psychologická nestabilita',
    emotionalEffect: 'Nepohoda, zmätok, napätie',
  },
]

export const CAMERA_CATEGORIES = {
  DOLLY: { name: 'Dolly', nameSk: 'Dolly', color: 'blue' },
  CRANE: { name: 'Crane', nameSk: 'Žeriav', color: 'purple' },
  TRACKING: { name: 'Tracking', nameSk: 'Jazda', color: 'green' },
  HANDHELD: { name: 'Handheld', nameSk: 'Z ruky', color: 'orange' },
  STATIC: { name: 'Static', nameSk: 'Statický', color: 'gray' },
  SPECIAL: { name: 'Special', nameSk: 'Špeciálne', color: 'pink' },
} as const

export function getCameraMovementById(id: string): CameraMovement | undefined {
  return CAMERA_MOVEMENTS.find(m => m.id === id)
}

export function getCameraMovementsByCategory(category: CameraMovement['category']): CameraMovement[] {
  return CAMERA_MOVEMENTS.filter(m => m.category === category)
}
