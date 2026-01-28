import React from 'react'

interface ItemEstrutura {
    id: string
    nome: string
    icone: string
    descricao?: string
}

interface EstruturaProps {
    itens?: ItemEstrutura[]
}

const defaultItens = [
    { id: '1', nome: 'Piscina', icone: 'pool', descricao: 'Piscina ampla para toda a família' },
    { id: '2', nome: 'Churrasqueira', icone: 'outdoor_grill', descricao: 'Churrasqueira completa com área coberta' },
    { id: '3', nome: 'Quiosque', icone: 'deck', descricao: 'Quiosque confortável para refeições' },
    { id: '4', nome: 'Estacionamento', icone: 'local_parking', descricao: 'Estacionamento privativo' },
    { id: '5', nome: 'Wi-Fi', icone: 'wifi', descricao: 'Internet de alta velocidade' },
    { id: '6', nome: 'Área Verde', icone: 'park', descricao: 'Ampla área verde arborizada' },
]

const iconMap: Record<string, React.ReactNode> = {
    pool: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
    ),
    outdoor_grill: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
    ),
    deck: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
    ),
    local_parking: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h4a4 4 0 110 8H8V7z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v10" />
        </svg>
    ),
    wifi: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
        </svg>
    ),
    park: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    ),
}

export default function Estrutura({ itens }: EstruturaProps) {
    const displayItens = itens && itens.length > 0 ? itens : defaultItens

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-white overflow-hidden" id="estrutura">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
            </div>

            <div className="mx-auto max-w-[1280px] relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Nossa Estrutura</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-4">
                        Tudo que você precisa para{' '}
                        <span className="text-primary">relaxar</span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Nossa estância oferece uma estrutura completa pensada para seu conforto e lazer
                    </p>
                </div>

                {/* Grid of Items */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {displayItens.map((item, index) => (
                        <div
                            key={item.id}
                            className="group relative bg-gradient-to-br from-background-warm to-white p-6 rounded-2xl border border-primary/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary mb-4 group-hover:from-primary group-hover:to-primary-light group-hover:text-white transition-all duration-300 mx-auto">
                                <span className="material-symbols-outlined text-[32px]">
                                    {item.icone || 'park'}
                                </span>
                            </div>

                            {/* Content */}
                            <h3 className="text-center font-bold text-text-main mb-2 group-hover:text-primary transition-colors text-sm sm:text-base">
                                {item.nome}
                            </h3>
                            <p className="text-center text-[10px] sm:text-xs text-text-muted leading-relaxed">
                                {item.descricao || item.nome}
                            </p>

                            {/* Hover Indicator */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-primary-light rounded-full group-hover:w-1/2 transition-all duration-300" />
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <a
                        href="#galeria"
                        className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all duration-300 cursor-pointer"
                    >
                        <span>Ver fotos da estrutura</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    )
}
