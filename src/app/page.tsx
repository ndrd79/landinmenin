import { createClient } from '@/lib/supabase/server'
import Header from '@/components/site/Header'

export const dynamic = 'force-dynamic'
import Hero from '@/components/site/Hero'
import Sobre from '@/components/site/Sobre'
import Estrutura from '@/components/site/Estrutura'
import Galeria from '@/components/site/Galeria'
import Precos from '@/components/site/Precos'
import Regras from '@/components/site/Regras'
import CalendarioSite from '@/components/site/Calendario'
import Footer from '@/components/site/Footer'
import WhatsAppFloat from '@/components/site/WhatsAppFloat'

interface GaleriaItem {
  id: string
  url: string
  alt: string
  secao: string
  ordem: number
}

export default async function Home() {
  const supabase = await createClient()

  // Fetch data
  const { data: config } = await supabase.from('configuracoes').select('*').single()
  const { data: pacotes } = await supabase.from('pacotes').select('*').order('ordem', { ascending: true })
  const { data: itensEstrutura } = await supabase.from('itens_estrutura').select('*').order('ordem', { ascending: true })
  const { data: fotos } = await supabase.from('galeria').select('*').order('ordem', { ascending: true })
  const { data: agendamentos } = await supabase.from('calendario').select('*')
  const { data: avisos } = await supabase.from('avisos').select('*').eq('ativo', true)

  const heroImage = (fotos as GaleriaItem[] | null)?.find((f: GaleriaItem) => f.secao === 'hero')?.url
  const galeriaFotos = (fotos as GaleriaItem[] | null)?.filter((f: GaleriaItem) => f.secao === 'galeria')

  return (
    <main className="min-h-screen">
      {/* Avisos Banner */}
      {avisos && avisos.length > 0 && (
        <div className="bg-green-600 text-white py-3 px-6 text-center text-sm font-bold animate-pulse">
          {avisos[0].titulo}: {avisos[0].mensagem}
        </div>
      )}

      <Header whatsapp={config?.whatsapp} />

      <Hero imageUrl={heroImage} />

      <Sobre />

      <Estrutura itens={itensEstrutura || undefined} />

      <Galeria fotos={galeriaFotos || undefined} />

      <Precos pacotes={pacotes || undefined} horarioCheckout={config?.horario_checkout} />

      <Regras />

      <CalendarioSite agendamentos={agendamentos || []} />

      <Footer />

      <WhatsAppFloat whatsapp={config?.whatsapp} />
    </main>
  )
}
