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
import BannerAvisos from '@/components/site/BannerAvisos'

import { Galeria as GaleriaType } from '@/types/database'

// Default values when Supabase is not available
const defaultConfig = {
  whatsapp: '18997473445',
  horario_checkout: '14:00'
}

interface Agendamento {
  data: string
  status: 'disponivel' | 'reservado' | 'promocao' | 'indisponivel'
  preco_especial?: number
}

export default async function Home() {
  let config = defaultConfig
  let pacotes = null
  let itensEstrutura = null
  let fotos: GaleriaType[] | null = null
  let agendamentos: Agendamento[] = []
  let avisos = null

  try {
    const supabase = await createClient()

    // Fetch data with error handling
    const [configRes, pacotesRes, estruturaRes, fotosRes, agendamentosRes, avisosRes] = await Promise.all([
      supabase.from('configuracoes').select('*').single(),
      supabase.from('pacotes').select('*').order('ordem', { ascending: true }),
      supabase.from('itens_estrutura').select('*').order('ordem', { ascending: true }),
      supabase.from('galeria').select('*').order('ordem', { ascending: true }),
      supabase.from('calendario').select('*'),
      supabase.from('avisos').select('*').eq('ativo', true)
    ])

    if (configRes.data) config = { ...defaultConfig, ...configRes.data }
    pacotes = pacotesRes.data
    itensEstrutura = estruturaRes.data
    fotos = fotosRes.data
    agendamentos = agendamentosRes.data || []
    avisos = avisosRes.data
  } catch (error) {
    console.error('Error fetching data from Supabase:', error)
    // Continue with default values
  }

  const heroImage = (fotos as GaleriaType[] | null)
    ?.filter((f: GaleriaType) => f.secao === 'hero' && f.ativo)
    ?.sort((a, b) => b.ordem - a.ordem)[0]?.url
  const galeriaFotos = (fotos as GaleriaType[] | null)?.filter((f: GaleriaType) => f.secao === 'galeria' && f.ativo)

  return (
    <main className="min-h-screen">
      <BannerAvisos avisos={avisos || []} />
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
