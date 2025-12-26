/**
 * Slovak Translations for FilmFlow AI
 */
export const sk = {
  // Common
  common: {
    loading: 'Načítavam...',
    save: 'Uložiť',
    cancel: 'Zrušiť',
    delete: 'Vymazať',
    edit: 'Upraviť',
    create: 'Vytvoriť',
    search: 'Hľadať',
    filter: 'Filtrovať',
    all: 'Všetko',
    none: 'Žiadne',
    yes: 'Áno',
    no: 'Nie',
    confirm: 'Potvrdiť',
    back: 'Späť',
    next: 'Ďalej',
    close: 'Zavrieť',
    submit: 'Odoslať',
    reset: 'Obnoviť',
    retry: 'Skúsiť znova',
  },

  // Navigation
  nav: {
    dashboard: 'Dashboard',
    actors: 'Herci',
    scenes: 'Scény',
    storyboard: 'Storyboardy',
    video: 'Videá',
    dialogue: 'Dialógy',
    music: 'Hudba',
    settings: 'Nastavenia',
    subscription: 'Predplatné',
    help: 'Pomoc',
    logout: 'Odhlásiť sa',
  },

  // Actors
  actors: {
    title: 'Herci',
    subtitle: 'Spravujte hercov pre vaše scény',
    addNew: 'Pridať herca',
    noActors: 'Zatiaľ nemáte žiadnych hercov',
    createFirst: 'Vytvorte svojho prvého herca',
    types: {
      main: 'Hlavný',
      supporting: 'Vedľajší',
      preset: 'Prednastavený',
    },
    fields: {
      name: 'Meno',
      description: 'Popis',
      age: 'Vek',
      gender: 'Pohlavie',
      physicalTraits: 'Fyzické črty',
      personality: 'Osobnosť',
      voiceStyle: 'Štýl hlasu',
    },
    genders: {
      male: 'Muž',
      female: 'Žena',
      other: 'Iné',
    },
    limits: {
      mainActors: 'Hlavní herci',
      supportingActors: 'Vedľajší herci',
      remaining: 'zostáva',
    },
  },

  // Scenes
  scenes: {
    title: 'Scény',
    subtitle: 'Vytvárajte a spravujte filmové scény',
    addNew: 'Nová scéna',
    noScenes: 'Zatiaľ nemáte žiadne scény',
    createFirst: 'Vytvorte svoju prvú scénu',
    types: {
      dialogue: 'Dialóg',
      action: 'Akcia',
      establishing: 'Úvodná',
      montage: 'Montáž',
    },
    fields: {
      title: 'Názov',
      description: 'Popis',
      location: 'Lokácia',
      timeOfDay: 'Denná doba',
      mood: 'Nálada',
      actors: 'Herci',
      dialogueLines: 'Dialógy',
      cameraMovement: 'Pohyb kamery',
    },
    timeOfDay: {
      morning: 'Ráno',
      afternoon: 'Popoludnie',
      evening: 'Večer',
      night: 'Noc',
      dawn: 'Úsvit',
      dusk: 'Súmrak',
    },
    moods: {
      tense: 'Napätá',
      romantic: 'Romantická',
      comedic: 'Komická',
      dramatic: 'Dramatická',
      mysterious: 'Tajomná',
      action: 'Akčná',
    },
  },

  // Generation
  generation: {
    title: 'Generovanie',
    generating: 'Generujem...',
    completed: 'Dokončené',
    failed: 'Zlyhalo',
    pending: 'Čaká sa',
    estimatedTime: 'Odhadovaný čas',
    storyboard: 'Storyboard',
    video: 'Video',
    audio: 'Audio',
    music: 'Hudba',
  },

  // Free tier
  freeTier: {
    title: 'Bezplatný plán',
    daily: 'denne',
    monthly: 'mesačne',
    remaining: 'zostáva',
    resetAt: 'Obnoví sa o',
    limitReached: 'Dosiahli ste limit',
    upgrade: 'Upgradovať plán',
    services: {
      higgsfield: 'Generovanie obrázkov',
      elevenlabs: 'Slovenský dabing',
      suno: 'Hudba',
      modal: 'GPU kredity',
    },
  },

  // Errors
  errors: {
    generic: 'Nastala chyba',
    notFound: 'Nenájdené',
    unauthorized: 'Nie ste prihlásený',
    forbidden: 'Nemáte oprávnenie',
    validation: 'Neplatné údaje',
    network: 'Chyba siete',
    server: 'Chyba servera',
    freeTierExceeded: 'Dosiahli ste denný limit',
    tryAgain: 'Skúste to prosím znova',
  },

  // Success messages
  success: {
    saved: 'Úspešne uložené',
    created: 'Úspešne vytvorené',
    deleted: 'Úspešne vymazané',
    updated: 'Úspešne aktualizované',
  },

  // Plans
  plans: {
    free: 'Free',
    indie: 'Indie',
    studio: 'Studio',
    enterprise: 'Enterprise',
    current: 'Aktuálny plán',
    upgrade: 'Upgradovať',
    features: 'Funkcie',
  },

  // Time formatting
  time: {
    justNow: 'Práve teraz',
    minutesAgo: 'pred {n} minútami',
    hoursAgo: 'pred {n} hodinami',
    daysAgo: 'pred {n} dňami',
    today: 'Dnes',
    yesterday: 'Včera',
  },
}

export type Translations = typeof sk
