'use client'

import {
  HelpCircle,
  Image,
  Video,
  FileText,
  Music,
  Mic,
  Upload,
  CheckCircle2,
  ArrowRight,
  Clock,
  DollarSign,
  Layers,
  Sparkles,
  Users,
  Play,
  Download,
  ExternalLink,
  Info,
  Lightbulb,
  AlertTriangle,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

// Step data for the workflow
const workflowSteps = [
  {
    number: 1,
    title: 'Vytvorte postavy (Herci)',
    titleEn: 'Create Characters',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    description: 'Najprv vytvorte postavy pre váš film. Každá postava potrebuje:',
    details: [
      'Meno a popis postavy',
      'Referenčné obrázky tváre (3-5 fotiek z rôznych uhlov)',
      'Popis hlasu a charakteru',
    ],
    tool: 'FilmFlow AI - Herci',
    link: '/dashboard/actors',
    tip: 'Použite konzistentné osvetlenie na referenčných fotkách pre lepšie výsledky.',
  },
  {
    number: 2,
    title: 'Generujte obrázky v NanoBanana',
    titleEn: 'Generate Images',
    icon: Image,
    color: 'from-yellow-500 to-orange-500',
    description: 'Vytvorte všetky potrebné obrázky pre váš film:',
    details: [
      'Prostredia a lokácie (interiéry, exteriéry)',
      'Kľúčové momenty scén',
      'Pozadie pre dialógy',
      'Špeciálne efekty a overlaye',
    ],
    tool: 'NanoBanana Creative Suite',
    link: 'https://nanobanana.app',
    tip: 'Generujte obrázky v rozlíšení 1920x1080 pre najlepšiu kvalitu videa.',
  },
  {
    number: 3,
    title: 'Napíšte scény a dialógy',
    titleEn: 'Write Scenes',
    icon: FileText,
    color: 'from-green-500 to-emerald-500',
    description: 'Vytvorte scenár pre každú scénu:',
    details: [
      'Názov a popis scény',
      'Dialógy medzi postavami',
      'Akcie a pohyby kamery',
      'Poznámky pre animáciu',
    ],
    tool: 'FilmFlow AI - Scény',
    link: '/dashboard/scenes',
    tip: 'Rozdeľte film na krátke scény (30-60 sekúnd) pre lepšiu kontrolu.',
  },
  {
    number: 4,
    title: 'Vytvorte Storyboard',
    titleEn: 'Create Storyboard',
    icon: Layers,
    color: 'from-purple-500 to-violet-500',
    description: 'Zostavte vizuálny plán filmu:',
    details: [
      'Usporiadajte obrázky do sekvencie',
      'Pridajte popisky a poznámky',
      'Nastavte trvanie každého záberu',
      'Definujte prechody medzi zábermi',
    ],
    tool: 'FilmFlow AI - Storyboard',
    link: '/dashboard/storyboard',
    tip: 'Storyboard vám pomôže vidieť celý film predtým, ako začnete generovať videá.',
  },
  {
    number: 5,
    title: 'Generujte videá',
    titleEn: 'Generate Videos',
    icon: Video,
    color: 'from-red-500 to-rose-500',
    description: 'Premeňte obrázky na videoklipy:',
    details: [
      'Vyberte obrázky pre každý záber',
      'Nastavte pohyb kamery (zoom, pan)',
      'Definujte dĺžku klipu (4-10 sekúnd)',
      'Generujte video pomocou AI',
    ],
    tool: 'FilmFlow AI - Videá / Kling AI',
    link: '/dashboard/video',
    tip: 'Generujte videá po častiach a kontrolujte kvalitu priebežne.',
  },
  {
    number: 6,
    title: 'Nahrajte dialógy v ElevenLabs',
    titleEn: 'Record Dialogues',
    icon: Mic,
    color: 'from-cyan-500 to-teal-500',
    description: 'Vytvorte hlasový dabig pre postavy:',
    details: [
      'Vytvorte hlas pre každú postavu (voice cloning)',
      'Nahrávajte dialógy podľa scenára',
      'Upravte intonáciu a emócie',
      'Exportujte v MP3/WAV formáte',
    ],
    tool: 'ElevenLabs',
    link: 'https://elevenlabs.io',
    tip: 'Používajte rovnaký hlas pre jednu postavu v celom filme pre konzistenciu.',
  },
  {
    number: 7,
    title: 'Pridajte hudbu a zvuky',
    titleEn: 'Add Music',
    icon: Music,
    color: 'from-pink-500 to-fuchsia-500',
    description: 'Doplňte zvukovú stopu:',
    details: [
      'Vyberte alebo generujte hudbu (Suno AI)',
      'Pridajte zvukové efekty',
      'Nastavte hlasitosť a mixáž',
      'Synchronizujte s videom',
    ],
    tool: 'FilmFlow AI - Hudba / Suno AI',
    link: '/dashboard/audio/music',
    tip: 'Hudba by nemala prerušovať dialógy - znížte hlasitosť pri rozprávaní.',
  },
  {
    number: 8,
    title: 'Exportujte do Higgsfield',
    titleEn: 'Export to Higgsfield',
    icon: Upload,
    color: 'from-indigo-500 to-blue-600',
    description: 'Finalizujte film v profesionálnom editore:',
    details: [
      'Exportujte všetky klipy z FilmFlow',
      'Importujte do Higgsfield Cinema Studio',
      'Pridajte finálne úpravy a efekty',
      'Exportujte finálne video',
    ],
    tool: 'Higgsfield Cinema Studio',
    link: 'https://higgsfield.ai/cinema-studio',
    tip: 'Higgsfield ponúka pokročilé nástroje pre úpravu a rendering.',
  },
]

// Requirements table data
const requirementsData = [
  {
    duration: '1 minúta',
    durationMin: 1,
    scenes: '2-3',
    images: '5-10',
    videoClips: '6-12',
    dialogueLines: '10-20',
    musicTracks: '1',
    estimatedTime: '2-4 hodiny',
  },
  {
    duration: '5 minút',
    durationMin: 5,
    scenes: '8-12',
    images: '25-50',
    videoClips: '30-60',
    dialogueLines: '50-100',
    musicTracks: '2-3',
    estimatedTime: '1-2 dni',
  },
  {
    duration: '10 minút',
    durationMin: 10,
    scenes: '15-25',
    images: '50-100',
    videoClips: '60-120',
    dialogueLines: '100-200',
    musicTracks: '3-5',
    estimatedTime: '3-5 dní',
  },
  {
    duration: '30 minút',
    durationMin: 30,
    scenes: '45-75',
    images: '150-300',
    videoClips: '180-360',
    dialogueLines: '300-600',
    musicTracks: '8-12',
    estimatedTime: '2-3 týždne',
  },
  {
    duration: '60 minút',
    durationMin: 60,
    scenes: '90-150',
    images: '300-600',
    videoClips: '360-720',
    dialogueLines: '600-1200',
    musicTracks: '15-25',
    estimatedTime: '1-2 mesiace',
  },
  {
    duration: '120 minút',
    durationMin: 120,
    scenes: '180-300',
    images: '600-1200',
    videoClips: '720-1440',
    dialogueLines: '1200-2400',
    musicTracks: '25-40',
    estimatedTime: '3-6 mesiacov',
  },
]

// Cost estimation data
const costData = [
  {
    service: 'NanoBanana',
    description: 'Generovanie obrázkov',
    freeLimit: '50 obrázkov/mesiac',
    proPlan: '$10/mesiac',
    perUnit: '~$0.02/obrázok',
  },
  {
    service: 'Kling AI',
    description: 'Generovanie videí',
    freeLimit: '10 klipov/deň',
    proPlan: '$30/mesiac',
    perUnit: '~$0.10-0.50/klip',
  },
  {
    service: 'ElevenLabs',
    description: 'Hlasový dabing',
    freeLimit: '10,000 znakov/mesiac',
    proPlan: '$5-22/mesiac',
    perUnit: '~$0.30/1000 znakov',
  },
  {
    service: 'Suno AI',
    description: 'Generovanie hudby',
    freeLimit: '50 skladieb/mesiac',
    proPlan: '$10/mesiac',
    perUnit: '~$0.20/skladba',
  },
  {
    service: 'Higgsfield',
    description: 'Video editing',
    freeLimit: 'Základná verzia zadarmo',
    proPlan: '$15-50/mesiac',
    perUnit: 'Podľa projektu',
  },
]

// Higgsfield export steps
const higgsFieldSteps = [
  {
    step: 1,
    title: 'Pripravte súbory',
    description: 'Exportujte všetky video klipy, audio súbory a obrázky z FilmFlow AI do jedného priečinka.',
    icon: Download,
  },
  {
    step: 2,
    title: 'Otvorte Higgsfield Cinema Studio',
    description: 'Navštívte higgsfield.ai/cinema-studio a prihláste sa do svojho účtu.',
    icon: ExternalLink,
  },
  {
    step: 3,
    title: 'Vytvorte nový projekt',
    description: 'Kliknite na "New Project" a nastavte rozlíšenie (1920x1080 odporúčané) a frame rate (24-30 fps).',
    icon: Sparkles,
  },
  {
    step: 4,
    title: 'Importujte médiá',
    description: 'Pretiahnite všetky súbory do "Media Library" alebo použite "Import" tlačidlo.',
    icon: Upload,
  },
  {
    step: 5,
    title: 'Zostavte časovú os',
    description: 'Pretiahnite klipy na časovú os v správnom poradí. Pridajte audio stopy pod video.',
    icon: Layers,
  },
  {
    step: 6,
    title: 'Pridajte prechody',
    description: 'Medzi klipy pridajte prechody (fade, dissolve, wipe) pre plynulý tok.',
    icon: Play,
  },
  {
    step: 7,
    title: 'Upravte audio',
    description: 'Synchronizujte dialógy s videom. Pridajte hudbu a nastavte hlasitosť.',
    icon: Music,
  },
  {
    step: 8,
    title: 'Exportujte finálne video',
    description: 'Kliknite na "Export" a vyberte formát (MP4 H.264 odporúčané) a kvalitu.',
    icon: CheckCircle2,
  },
]

export default function HelpPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4" />
          Kompletný sprievodca
        </div>
        <h1 className="text-4xl font-bold mb-4">
          Ako vytvoriť film pomocou AI
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Krok za krokom sprievodca pre začiatočníkov. Naučte sa vytvárať profesionálne
          videá a filmy pomocou umelej inteligencie - od nápadu až po finálny export.
        </p>
      </div>

      {/* Quick Start Alert */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Rýchly štart pre začiatočníkov</h3>
            <p className="text-muted-foreground mb-3">
              Ak ste úplný začiatočník, odporúčame začať s krátkym 1-minútovým videom.
              Pomôže vám to pochopiť celý proces bez veľkých nákladov a časovej investície.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-background rounded-lg text-sm">5-10 obrázkov</span>
              <span className="px-3 py-1 bg-background rounded-lg text-sm">6-12 klipov</span>
              <span className="px-3 py-1 bg-background rounded-lg text-sm">2-4 hodiny práce</span>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Pracovný postup - 8 krokov</h2>
            <p className="text-muted-foreground">Dodržujte toto poradie pre najlepšie výsledky</p>
          </div>
        </div>

        <div className="space-y-6">
          {workflowSteps.map((step, index) => (
            <div
              key={step.number}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Step Number & Icon */}
                <div className={`bg-gradient-to-br ${step.color} p-6 lg:w-48 flex lg:flex-col items-center lg:items-start gap-4`}>
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-white/70 text-sm font-medium">Krok {step.number}</div>
                    <div className="text-white text-lg font-bold lg:hidden">{step.title}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold hidden lg:block">{step.title}</h3>
                      <p className="text-muted-foreground mt-1">{step.description}</p>
                    </div>
                    <Link
                      href={step.link}
                      target={step.link.startsWith('http') ? '_blank' : undefined}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap"
                    >
                      {step.tool}
                      {step.link.startsWith('http') && <ExternalLink className="h-4 w-4" />}
                    </Link>
                  </div>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Tip:</span> {step.tip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Arrow to next step */}
              {index < workflowSteps.length - 1 && (
                <div className="flex justify-center -mb-3 relative z-10">
                  <div className="w-10 h-10 bg-muted border border-border rounded-full flex items-center justify-center">
                    <ArrowRight className="h-5 w-5 text-muted-foreground rotate-90" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Requirements Table */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Koľko potrebujete pre váš projekt</h2>
            <p className="text-muted-foreground">Orientačná tabuľka podľa dĺžky filmu</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-4 font-semibold">Dĺžka filmu</th>
                  <th className="text-center p-4 font-semibold">Scény</th>
                  <th className="text-center p-4 font-semibold">Obrázky</th>
                  <th className="text-center p-4 font-semibold">Video klipy</th>
                  <th className="text-center p-4 font-semibold">Dialógy (riadky)</th>
                  <th className="text-center p-4 font-semibold">Hudba (skladby)</th>
                  <th className="text-center p-4 font-semibold">Odhadovaný čas</th>
                </tr>
              </thead>
              <tbody>
                {requirementsData.map((row, index) => (
                  <tr
                    key={row.duration}
                    className={`border-t border-border ${index % 2 === 0 ? '' : 'bg-muted/20'}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          row.durationMin <= 5 ? 'bg-green-500/10 text-green-500' :
                          row.durationMin <= 30 ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          <Video className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-semibold">{row.duration}</div>
                          <div className="text-xs text-muted-foreground">
                            {row.durationMin <= 5 ? 'Krátke video' :
                             row.durationMin <= 30 ? 'Stredný film' : 'Celovečerný film'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-center p-4 font-medium">{row.scenes}</td>
                    <td className="text-center p-4 font-medium">{row.images}</td>
                    <td className="text-center p-4 font-medium">{row.videoClips}</td>
                    <td className="text-center p-4 font-medium">{row.dialogueLines}</td>
                    <td className="text-center p-4 font-medium">{row.musicTracks}</td>
                    <td className="text-center p-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {row.estimatedTime}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Poznámka:</span> Tieto čísla sú orientačné.
            Skutočné požiadavky závisia od zložitosti scén, počtu postáv a vášho štýlu práce.
            Pre prvý projekt odporúčame začať s 1-5 minútovým videom.
          </p>
        </div>
      </section>

      {/* Cost Estimation */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Náklady na služby</h2>
            <p className="text-muted-foreground">Prehľad cien AI nástrojov (december 2024)</p>
          </div>
        </div>

        <div className="grid gap-4">
          {costData.map((item) => (
            <div
              key={item.service}
              className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.service}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Zadarmo</div>
                    <div className="text-sm font-medium">{item.freeLimit}</div>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Pro plán</div>
                    <div className="text-sm font-medium text-primary">{item.proPlan}</div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">Za jednotku</div>
                    <div className="text-sm font-medium">{item.perUnit}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cost Examples */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl p-5">
            <div className="text-green-500 font-bold text-lg mb-2">10 minút video</div>
            <div className="text-3xl font-bold mb-2">~$15-30</div>
            <p className="text-sm text-muted-foreground">
              50-100 obrázkov + 60-120 klipov + dabing + hudba
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20 rounded-xl p-5">
            <div className="text-yellow-500 font-bold text-lg mb-2">30 minút film</div>
            <div className="text-3xl font-bold mb-2">~$50-100</div>
            <p className="text-sm text-muted-foreground">
              150-300 obrázkov + 180-360 klipov + plný dabing
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 rounded-xl p-5">
            <div className="text-red-500 font-bold text-lg mb-2">120 minút film</div>
            <div className="text-3xl font-bold mb-2">~$200-500</div>
            <p className="text-sm text-muted-foreground">
              600-1200 obrázkov + 720-1440 klipov + profesionálny dabing
            </p>
          </div>
        </div>
      </section>

      {/* Higgsfield Export Guide */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Upload className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Export do Higgsfield Cinema Studio</h2>
            <p className="text-muted-foreground">Detailný návod na finálnu úpravu filmu</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {/* Higgsfield Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Higgsfield Cinema Studio</h3>
                <p className="text-white/80">Profesionálny online editor pre AI generované videá</p>
                <a
                  href="https://higgsfield.ai/cinema-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm text-white/90 hover:text-white"
                >
                  higgsfield.ai/cinema-studio
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="p-6">
            <div className="grid gap-4">
              {higgsFieldSteps.map((step, index) => (
                <div key={step.step} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-500/10 text-indigo-500 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div className="flex-1 pb-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-2 mb-1">
                      <step.icon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold">{step.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-muted/50 p-6 border-t border-border">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Pro tipy pre Higgsfield
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Používajte klávesové skratky: <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">J</kbd> <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">K</kbd> <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">L</kbd> pre prehrávanie
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Pred exportom nastavte "Quality: High" pre najlepšiu kvalitu
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Uložte projekt pravidelne pomocou <kbd className="px-1.5 py-0.5 bg-background rounded text-xs">Ctrl+S</kbd>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                <p className="text-sm text-muted-foreground">
                  Exportujte v MP4 H.264 pre najlepšiu kompatibilitu
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <HelpCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Často kladené otázky</h2>
            <p className="text-muted-foreground">Odpovede na najčastejšie otázky začiatočníkov</p>
          </div>
        </div>

        <div className="grid gap-4">
          {[
            {
              q: 'Musím použiť všetky nástroje?',
              a: 'Nie, môžete začať len s niekoľkými nástrojmi. Pre jednoduché video stačí NanoBanana (obrázky) + Kling AI (video) + bezplatná hudba. Dialógy a pokročilé funkcie pridáte neskôr.',
            },
            {
              q: 'Koľko stojí vytvorenie prvého videa?',
              a: 'Prvé krátke video (1-5 minút) môžete vytvoriť zadarmo alebo za menej ako $10 pomocou free tier verzií všetkých nástrojov.',
            },
            {
              q: 'Potrebujem špeciálny počítač?',
              a: 'Nie, všetky AI nástroje bežia v cloude. Stačí vám akýkoľvek moderný webový prehliadač a stabilné internetové pripojenie.',
            },
            {
              q: 'Ako dlho trvá generovanie jedného videa?',
              a: 'Generovanie jedného 5-sekundového klipu trvá zvyčajne 1-5 minút. Pre 10-minútové video potrebujete 60-120 klipov, čo môže trvať niekoľko hodín.',
            },
            {
              q: 'Môžem použiť vygenerovaný obsah komerčne?',
              a: 'Závisí od podmienok jednotlivých služieb. Väčšina Pro plánov umožňuje komerčné využitie, ale vždy si prečítajte podmienky použitia.',
            },
            {
              q: 'Čo ak niečo pokazím?',
              a: 'Nebojte sa experimentovať! Všetky kroky sú reverzibilné a môžete kedykoľvek začať odznova. Odporúčame pravidelne ukladať svoj pokrok.',
            },
          ].map((faq, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-5">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {faq.q}
              </h4>
              <p className="text-muted-foreground pl-8">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-8 text-center text-primary-foreground">
        <h2 className="text-2xl font-bold mb-3">Ste pripravení začať?</h2>
        <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
          Teraz už viete všetko potrebné. Začnite s vytvorením vašich prvých postáv
          a postupne prejdite celým procesom.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/dashboard/actors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            <Users className="h-5 w-5" />
            Vytvoriť postavy
          </Link>
          <Link
            href="/dashboard/presets"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-foreground/20 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/30 transition-colors"
          >
            <Sparkles className="h-5 w-5" />
            Pozrieť demo presety
          </Link>
        </div>
      </section>

      {/* Support Footer */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Potrebujete ďalšiu pomoc? Kontaktujte nás na</p>
        <a href="mailto:support@filmflow.ai" className="text-primary hover:underline">
          support@filmflow.ai
        </a>
      </div>
    </div>
  )
}
