/**
 * FilmFlow AI Presets - Main Export
 * Demo Movie: "Stratené Srdcia" (Lost Hearts)
 */

export * from './actors'
export * from './scenes'
export * from './storyboards'
export * from './music'
export * from './camera-movements'

// Demo presets by size
export * from './demo-small'
export * from './demo-medium'

// Demo movie metadata
export const demoMovieInfo = {
  title: 'Stratené Srdcia',
  titleEn: 'Lost Hearts',
  genre: 'Drama / Romance',
  duration: '~90 minutes',
  language: 'Slovak',
  setting: 'Small Slovak town with vineyards',
  year: '2024',
  synopsis: {
    sk: 'Mária, úspešná klaviristka, sa vracia do rodného slovenského mestečka na pohreb svojej babičky. Po desiatich rokoch v zahraničí musí čeliť minulosti - svojej sestre Elene, s ktorou stratila kontakt, a svojej prvej láske Jakubovi, vinárovi, ktorý na ňu nikdy nezabudol. Keď sa objaví tajomný cudzinec Martin s tvrdením, že je Máriiným nevlastným bratom, odhaľuje sa rodinné tajomstvo, ktoré zmení všetko.',
    en: 'Maria, a successful pianist, returns to her small Slovak hometown for her grandmother\'s funeral. After ten years abroad, she must face her past - her estranged sister Elena, and her first love Jakub, a winemaker who never forgot her. When a mysterious stranger Martin appears claiming to be Maria\'s half-brother, a family secret is revealed that changes everything.',
  },
  themes: [
    'Návrat domov',
    'Odpustenie',
    'Rodinné tajomstvá',
    'Prvá láska',
    'Identita',
    'Zmierenie',
  ],
  acts: [
    { number: 1, title: 'Návrat', titleEn: 'The Return', scenes: '1-7' },
    { number: 2, title: 'Konfrontácie', titleEn: 'Confrontations', scenes: '8-14' },
    { number: 3, title: 'Tajomstvá', titleEn: 'Secrets', scenes: '15-21' },
    { number: 4, title: 'Rozhodnutia', titleEn: 'Decisions', scenes: '22-28' },
    { number: 5, title: 'Nový začiatok', titleEn: 'New Beginning', scenes: '29-35' },
  ],
}

// Statistics summary (for huge preset)
export const presetStats = {
  actors: {
    total: 25,
    main: 4,
    supporting: 8,
    minor: 8,
    generic: 5,
  },
  scenes: {
    total: 35,
    dialogueLines: 200,
    totalDuration: 3600, // ~60 min of scenes for 30 min film
  },
  storyboards: {
    total: 50,
  },
  voices: {
    total: 24,
  },
}

// Huge demo info (for consistency with small/medium)
export const hugeDemoInfo = {
  id: 'demo-huge',
  title: 'Stratené Srdcia',
  titleEn: 'Lost Hearts',
  size: 'huge',
  duration: '~30 minutes',
  genre: 'Drama / Romance',
  language: 'Slovak',
  description: {
    sk: demoMovieInfo.synopsis.sk,
    en: demoMovieInfo.synopsis.en,
  },
  stats: {
    actors: 25,
    scenes: 35,
    storyboards: 50,
    dialogueLines: 200,
  },
}

// All available demo presets
import { smallDemoInfo } from './demo-small'
import { mediumDemoInfo } from './demo-medium'

export const allDemoPresets = [
  {
    ...smallDemoInfo,
    recommended: true,
    description: 'Perfektné pre testovanie Higgsfield Cinema Studio',
  },
  {
    ...mediumDemoInfo,
    recommended: false,
    description: 'Kompletný príbeh s rodinnými konfliktami',
  },
  {
    ...hugeDemoInfo,
    recommended: false,
    description: 'Plná 30-minútová filmová produkcia',
  },
]
