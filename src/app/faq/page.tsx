import Link from 'next/link'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import WhatsAppFloat from '@/components/site/WhatsAppFloat'
import { createClient } from '@/lib/supabase/server'
import BannerAvisos from '@/components/site/BannerAvisos'

export const dynamic = 'force-dynamic'

export default async function FAQPage() {
    const supabase = await createClient()
    const { data: config } = await supabase.from('configuracoes').select('*').single()
    const { data: avisos } = await supabase.from('avisos').select('*').eq('ativo', true)

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
            answer: `O horário padrão é das 08:00 às ${config?.horario_checkout || '22:00'} horas. Alugando 2 dias, é permitido pernoitar no local com valores reduzidos.`
        },
        {
            icon: 'bed',
            question: 'O espaço fornece roupa de cama?',
            answer: '❌ Não fornecemos roupa de cama.',
            variant: 'red'
        },
        {
            icon: 'cleaning_services',
            question: 'A área é entregue limpa?',
            answer: '✔ Sim! A área de lazer é entregue totalmente limpa, incluindo os banheiros.'
        },
        {
            icon: 'liquor',
            question: 'Posso colocar bebidas para gelar antes do evento?',
            answer: '👍 Sim! Caso a festa tenha muita bebida, você pode colocar para gelar um dia antes, desde que avise com antecedência.'
        },
        {
            icon: 'event_available',
            question: 'Como funciona a reserva da data?',
            answer: 'A reserva só é confirmada mediante pagamento de uma entrada mínima de R$ 200. O restante do valor pode ser pago até a data reservada. Em caso de cancelamento, a entrada não é reembolsada.'
        },
        {
            icon: 'credit_card',
            question: 'Aceita cartão de crédito?',
            answer: '✔ Sim! Parcelamos no cartão de crédito em até 12x, com juros por conta do locatário.'
        },
        {
            icon: 'park',
            question: 'Como é o ambiente do local?',
            answer: 'Ambiente arejado, área rural e arborizada, sem problemas com vizinhança. Ideal para quem busca tranquilidade e conforto.'
        },
        {
            icon: 'inventory',
            question: 'O que está incluso no aluguel?',
            answer: 'Clube coberto (154m²), 40 cadeiras, 10 mesas plásticas, 2 mesas para baralho, 1 mesa grande de mármore, Wi-Fi, TV e Som, Iluminação de festa, Gás de cozinha, 2 banheiros, Cama elástica, 1 freezer (400L), 2 geladeiras, 2 quiosques e Piscina grande.'
        },
        {
            icon: 'do_not_disturb',
            question: 'Quais itens NÃO são fornecidos?',
            answer: 'Não fornecemos: Papel higiênico, Panelas, Detergente e Talheres.',
            variant: 'red'
        },
        {
            icon: 'photo_camera',
            question: 'Onde posso ver mais fotos e novidades?',
            answer: 'Você pode nos acompanhar pelo Facebook (@estancia_menin) ou Instagram (@estancia_menin). Também temos um grupo no WhatsApp para promoções e datas.'
        },
        {
            icon: 'call',
            question: 'Como entrar em contato para dúvidas ou reservas?',
            answer: `Para mais informações ou reservas, entre em contato pelo telefone: (18) 99747-3445.`
        }
    ]

    return (
        <div className="relative flex min-h-screen w-full flex-col">
            <BannerAvisos avisos={avisos || []} />
            <Header whatsapp={config?.whatsapp} />

            {/* Page Title */}
            <section className="bg-primary-dark px-6 py-16 lg:px-20 text-white relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(#4a7c23 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                />
                <div className="mx-auto max-w-[900px] relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-primary-light mb-4 backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[18px]">help</span>
                        Dúvidas Frequentes
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-display">Perguntas Frequentes</h1>
                    <p className="text-white/80 text-lg">Tire suas dúvidas sobre a Estância Menin</p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="bg-background-warm px-6 py-16 lg:px-20 flex-1">
                <div className="mx-auto max-w-[900px]">
                    <div className="space-y-4">
                        {faqItems.map((item, index) => (
                            <details key={index} className="faq-item group" open={index === 0}>
                                <summary className="faq-summary list-none cursor-pointer flex items-center p-6 bg-white rounded-2xl border border-primary/10 shadow-sm hover:border-primary/30 transition-all group-open:rounded-b-none group-open:border-b-transparent relative z-10">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${item.variant === 'red' ? 'bg-red-50 text-red-500' : 'bg-primary/10 text-primary'}`}>
                                        <span className="material-symbols-outlined text-[20px]">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <span className="flex-1 font-bold text-text-main text-lg">{item.question}</span>
                                    <span className="material-symbols-outlined faq-icon text-primary transition-transform group-open:rotate-180">expand_more</span>
                                </summary>
                                <div className="faq-content p-6 pt-2 bg-white rounded-b-2xl border-x border-b border-primary/10 -mt-px relative z-0">
                                    <p className="text-text-muted leading-relaxed whitespace-pre-line">{item.answer}</p>
                                    {item.link && (
                                        <a
                                            href={item.link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold mt-4"
                                        >
                                            <span className="material-symbols-outlined text-[18px]">map</span>
                                            {item.link.text}
                                        </a>
                                    )}
                                </div>
                            </details>
                        ))}
                    </div>

                    <div className="mt-12 bg-white rounded-3xl p-8 border border-primary/10 text-center shadow-xl shadow-primary/5">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                            <span className="material-symbols-outlined text-3xl">chat</span>
                        </div>
                        <h3 className="text-2xl font-bold text-text-main mb-2">Ainda tem dúvidas?</h3>
                        <p className="text-text-muted mb-8">Entre em contato diretamente pelo WhatsApp</p>
                        <a
                            href={`https://wa.me/55${config?.whatsapp?.replace(/\D/g, '') || '18997473445'}?text=Olá! Tenho uma dúvida sobre a Estância Menin.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-light text-white font-bold px-10 py-4 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all shadow-primary/20"
                        >
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
