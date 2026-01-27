import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import WhatsAppFloat from '@/components/site/WhatsAppFloat'
import { createClient } from '@/lib/supabase/server'

export default async function FAQPage() {
    const supabase = await createClient()
    const { data: config } = await supabase.from('configuracoes').select('*').single()

    const faqItems = [
        {
            icon: 'location_on',
            question: 'Onde fica localizada a área de lazer?',
            answer: 'Nossa área de lazer está localizada em ambiente rural, arborizado e tranquilo.',
            link: {
                text: 'Ver localização no Google Maps',
                url: 'https://maps.app.goo.gl/kaPn93FqdCE1jr3C9'
            }
        },
        {
            icon: 'celebration',
            question: 'Para quais tipos de eventos o espaço pode ser alugado?',
            answer: 'O espaço é ideal para: Encontros religiosos, Confraternizações de família, amigos e empresas, Chá revelação, Aniversários e Festas de casamento.'
        },
        {
            icon: 'block',
            question: 'Quais tipos de eventos NÃO são permitidos?',
            answer: 'Não alugamos para: Festas com fins lucrativos, eventos que cobram entrada, venda de bebidas, revoadas ou festas de jovens com som alto. Prezamos pela tranquilidade do ambiente e da região.',
            variant: 'red'
        },
        {
            icon: 'payments',
            question: 'Quais são os valores de aluguel?',
            answer: 'Diária sem quarto: R$ 550 | Com 1 quarto (ventilador): R$ 600 | Com 1 quarto (ar): R$ 650 | Com 2 quartos: R$ 700. Durante a semana trabalhamos com promoções especiais.'
        },
        {
            icon: 'schedule',
            question: 'Qual é o horário de utilização?',
            answer: `O horário padrão é das 09:00 às ${config?.horario_checkout || '22:00'} horas. Alugando 2 dias, é permitido pernoitar no local com valores reduzidos.`
        },
        {
            icon: 'bed',
            question: 'O espaço fornece roupa de cama?',
            answer: '❌ Não fornecemos roupa de cama.',
            variant: 'red'
        }
    ]

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <Header whatsapp={config?.whatsapp} />

            {/* Page Title */}
            <section className="bg-[#102213] px-6 py-16 lg:px-20 text-white relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#13ec37 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />
                <div className="mx-auto max-w-[900px] relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-900/50 px-4 py-2 text-sm font-bold text-green-400 mb-4">
                        <span className="material-symbols-outlined text-[18px]">help</span>
                        Dúvidas Frequentes
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Perguntas Frequentes</h1>
                    <p className="text-green-200 text-lg">Tire suas dúvidas sobre a Estância Menin</p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="bg-[#f8fcf9] px-6 py-16 lg:px-20 flex-1">
                <div className="mx-auto max-w-[900px]">
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <details key={index} className="faq-item group" open={index === 0}>
                                <summary className="faq-summary">
                                    <span className={`material-symbols-outlined mr-3 ${item.variant === 'red' ? 'text-red-500' : 'text-green-600'}`}>
                                        {item.icon}
                                    </span>
                                    <span className="flex-1">{item.question}</span>
                                    <span className="material-symbols-outlined faq-icon">expand_more</span>
                                </summary>
                                <div className="faq-content">
                                    <p>{item.answer}</p>
                                    {item.link && (
                                        <a
                                            href={item.link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mt-2"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">map</span>
                                            {item.link.text}
                                        </a>
                                    )}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-12 bg-white rounded-2xl p-8 border border-green-100 text-center shadow-sm">
                        <h3 className="text-xl font-bold text-text-main mb-2">Ainda tem dúvidas?</h3>
                        <p className="text-gray-500 mb-6">Entre em contato diretamente pelo WhatsApp</p>
                        <a
                            href={`https://wa.me/55${config?.whatsapp?.replace(/\D/g, '') || '18997473445'}?text=Olá! Tenho uma dúvida.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                        >
                            <span className="material-symbols-outlined">chat</span>
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
            <WhatsAppFloat whatsapp={config?.whatsapp} />
        </div>
    )
}
