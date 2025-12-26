import Link from 'next/link'
import { Film, Sparkles, Users, Video, Mic, Music } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-cinematic">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">FilmFlow AI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Prihlásiť sa
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Začať zadarmo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm mb-8">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Powered by AI</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Generujte filmové scény
          <br />
          <span className="text-primary">s pomocou AI</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          FilmFlow AI je nástroj pre slovenských filmárov a tvorcov obsahu.
          Vytvárajte storyboardy, generujte videá a dialógy s umelou inteligenciou.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-lg"
          >
            Vyskúšať zadarmo
          </Link>
          <Link
            href="/features"
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors text-lg"
          >
            Zistiť viac
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">Čo všetko dokáže FilmFlow AI</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Správa hercov"
            description="Vytvorte profily hlavných a vedľajších hercov. Nahrajte referenčné fotky pre konzistentnú generáciu."
          />
          <FeatureCard
            icon={<Film className="h-8 w-8" />}
            title="Preset scény"
            description="Knižnica predpripravených slovenských dramatických scén. Romantické, akčné, emotívne momenty."
          />
          <FeatureCard
            icon={<Sparkles className="h-8 w-8" />}
            title="AI Storyboardy"
            description="Generujte vysokonákladné 4K storyboardy pomocou najnovších AI modelov ako Seedream a Flux."
          />
          <FeatureCard
            icon={<Video className="h-8 w-8" />}
            title="Video generácia"
            description="Premeňte storyboardy na videá s Sora, Veo a Kling. 70+ cinematických pohybov kamery."
          />
          <FeatureCard
            icon={<Mic className="h-8 w-8" />}
            title="Slovenské dialógy"
            description="Generujte realistické slovenské hlasy s ElevenLabs. Podpora západo, stredo a východoslovenského prízvuku."
          />
          <FeatureCard
            icon={<Music className="h-8 w-8" />}
            title="Filmová hudba"
            description="Vytvárajte originálne soundtracky s Suno AI. Dramatické, romantické a akčné kompozície."
          />
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Začnite zadarmo</h2>
          <p className="text-muted-foreground">
            Free tier obsahuje 5 generácií denne. Žiadna kreditná karta.
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="/pricing"
            className="px-8 py-4 bg-accent-gold text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Zobraziť cenník
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 FilmFlow AI. Všetky práva vyhradené.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 bg-card border border-border/50 rounded-xl hover:border-primary/50 transition-colors">
      <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
