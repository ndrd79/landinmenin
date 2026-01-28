'use client'

import { useState, useEffect } from 'react'

const avaliacoes = [
    {
        nome: 'Isabelly Reis',
        comentario: 'Boa localização pertinho da cidade! Lugar maravilhoso, piscina grande e quentinha, bem completo. Amei d+ passar o dia! 😊',
        estrelas: 5,
        tempo: '4 semanas atrás'
    },
    {
        nome: 'Juliano Morales',
        comentario: 'A chácara é simplesmente perfeita para festas! O espaço é amplo, bem organizado e muito bem cuidado. A área gourmet é completa, com churrasqueira, pia, geladeira, o que facilita bastante na hora de preparar e servir os alimentos.',
        estrelas: 5,
        tempo: '6 meses atrás'
    },
    {
        nome: 'Helen Cristina',
        comentario: 'Lugar maravilhoso, aconchegante, bem familiar... Família toda adora 👏👏👏👏 parabéns aos proprietários 👏👏...',
        estrelas: 5,
        tempo: '4 meses atrás'
    },
    {
        nome: 'Vitória Aparecida Dias Calixto',
        comentario: 'Muito bom a estância, lugar bem familiar.',
        estrelas: 5,
        tempo: '4 meses atrás'
    },
    {
        nome: 'Rosana Alves',
        comentario: 'Lugar maravilhoso, proprietário super atencioso e prestativo, parabéns pelo espaço 👏👏👏👏...',
        estrelas: 5,
        tempo: '11 meses atrás'
    }
]

export default function Depoimentos() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % avaliacoes.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-background-light overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -ml-48 -mb-48" />

            <div className="mx-auto max-w-[1280px] relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Depoimentos</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-4">
                        O que nossos <span className="text-primary">clientes</span> dizem
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-yellow-500 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className="material-symbols-outlined fill-current">star</span>
                        ))}
                    </div>
                    <p className="text-text-muted font-medium">Avaliação 5.0 no Google Maps</p>
                </div>

                {/* Desktop Grid / Mobile Carousel */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {avaliacoes.map((item, index) => (
                        <div
                            key={index}
                            className={`bg-white p-8 rounded-[2rem] border border-primary/10 shadow-xl shadow-primary/5 flex flex-col gap-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${index > 2 ? 'hidden lg:flex' : ''
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                    {item.nome.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main">{item.nome}</h4>
                                    <div className="flex text-yellow-500 scale-75 origin-left">
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className="material-symbols-outlined text-[18px] fill-current">star</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <p className="text-text-muted leading-relaxed italic h-full">
                                "{item.comentario}"
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                                <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">{item.tempo}</span>
                                <div className="flex items-center gap-1 opacity-40">
                                    <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4 object-contain" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* G-Maps Link */}
                <div className="mt-16 text-center">
                    <a
                        href="https://www.google.com/maps/place/Est%C3%A2ncia+Menin/@-21.7407769,-51.0313308,17z/data=!4m8!3m7!1s0x9496a1a1ea666099:0x6a85e5551172d50!8m2!3d-21.7407769!4d-51.0313308!9m1!1b1!16s%2Fg%2F11j0t8kfs0"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-full text-sm font-bold text-text-muted hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" alt="Google" className="h-4" />
                        Ver todas as avaliações no Google
                    </a>
                </div>
            </div>
        </section>
    )
}
