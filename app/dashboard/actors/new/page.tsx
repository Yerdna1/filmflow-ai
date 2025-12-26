'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Upload, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewActorPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultType = searchParams.get('type') as 'MAIN' | 'SUPPORTING' | null

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    type: defaultType || 'MAIN',
    age: '',
    gender: '',
    description: '',
    backstory: '',
    imageUrl: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/actors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age) : undefined,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/dashboard/actors')
      } else {
        setError(data.error?.message || 'Nastala chyba pri vytváraní herca')
      }
    } catch (err) {
      setError('Nastala neočakávaná chyba')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/actors">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Nový herec</h1>
          <p className="text-muted-foreground">Vytvorte profil nového herca</p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Fotografia</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border rounded-xl hover:border-primary/50 transition-colors cursor-pointer">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Kliknite pre nahratie fotografie
                <br />
                <span className="text-xs">PNG, JPG do 5MB</span>
              </p>
            </div>
            <Input
              type="url"
              placeholder="Alebo vložte URL obrázka..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-4"
            />
          </CardContent>
        </Card>

        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Základné informácie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Meno *</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Napr. Ján Novák"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Typ *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as 'MAIN' | 'SUPPORTING' })}
                  className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="MAIN">Hlavný herec</option>
                  <option value="SUPPORTING">Vedľajší herec</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Vek</label>
                <Input
                  type="number"
                  min="1"
                  max="120"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="35"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Pohlavie</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="mt-1 w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Nezadané</option>
                <option value="muž">Muž</option>
                <option value="žena">Žena</option>
                <option value="iné">Iné</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popis postavy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Krátky popis</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Krátky popis postavy pre AI generátor..."
                rows={3}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tento popis bude použitý pri generovaní scén
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">Backstory (voliteľné)</label>
              <textarea
                value={formData.backstory}
                onChange={(e) => setFormData({ ...formData, backstory: e.target.value })}
                placeholder="Detailná história postavy..."
                rows={5}
                className="mt-1 w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="outline" type="button" asChild className="flex-1">
            <Link href="/dashboard/actors">Zrušiť</Link>
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Vytváranie...
              </>
            ) : (
              'Vytvoriť herca'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
