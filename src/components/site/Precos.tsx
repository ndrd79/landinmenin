interface Pacote {
    id: string
    nome: string
    titulo?: string
    preco: number
    descricao?: string
    itens?: string[] | string
    itens_inclusos?: string[]
    destaque?: boolean
}

interface PrecosProps {
    pacotes?: Pacote[]
    horarioCheckout?: string
}

const defaultPacotes: Pacote[] = [
    {
        id: '1',
        nome: 'Diária',
        preco: 500,
        descricao: 'Perfeito para um dia de lazer',
        itens_inclusos: ['Uso da piscina', 'Churrasqueira', 'Quiosque', 'Estacionamento'],
    },
    {
        id: '2',
        nome: 'Final de Semana',
        preco: 1200,
        descricao: 'Ideal para curtir o fim de semana completo',
        itens_inclusos: ['Uso da piscina', 'Churrasqueira', 'Quiosque', 'Estacionamento', 'Pernoite', 'Café da manhã'],
        destaque: true,
    },
    {
        id: '3',
        nome: 'Semana Completa',
        preco: 3000,
        descricao: 'Para quem quer relaxar por mais tempo',
        itens_inclusos: ['Uso da piscina', 'Churrasqueira', 'Quiosque', 'Estacionamento', 'Pernoite', 'Café da manhã', 'Limpeza diária'],
    },
]

// Helper function to get items from either field
function getItens(pacote: Pacote): string[] {
    if (pacote.itens_inclusos && Array.isArray(pacote.itens_inclusos)) {
        return pacote.itens_inclusos
    }
    if (pacote.itens) {
        if (Array.isArray(pacote.itens)) {
            return pacote.itens
        }
        if (typeof pacote.itens === 'string') {
            try {
                return JSON.parse(pacote.itens)
            } catch {
                return []
            }
        }
    }
    return []
}

export default function Precos({ pacotes, horarioCheckout }: PrecosProps) {
    const displayPacotes = pacotes && pacotes.length > 0 ? pacotes : defaultPacotes

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-white overflow-hidden" id="precos">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-2xl" />
            </div>

            <div className="mx-auto max-w-[1280px] relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Pacotes e Preços</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-4">
                        Escolha o melhor{' '}
                        <span className="text-primary">pacote</span>{' '}
                        para você
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Oferecemos opções flexíveis para atender às suas necessidades
                    </p>
                </div>

                {/* Pricing Cards - Single Line */}
                <div className={`grid gap-8 items-stretch pt-4 ${displayPacotes.length === 1 ? 'max-w-md mx-auto' :
                        displayPacotes.length === 2 ? 'max-w-3xl mx-auto md:grid-cols-2' :
                            'max-w-[1200px] mx-auto md:grid-cols-3'
                    }`}>
                    {displayPacotes.map((pacote) => {
                        const itens = getItens(pacote)
                        return (
                            <div
                                key={pacote.id}
                                className={`relative flex flex-col rounded-3xl transition-all duration-300 hover:-translate-y-2 ${pacote.destaque
                                    ? 'bg-gradient-to-br from-primary to-primary-dark text-white shadow-2xl shadow-primary/30 md:scale-105 z-10'
                                    : 'bg-white border-2 border-primary/10 hover:border-primary/30 hover:shadow-xl'
                                    }`}
                            >
                                {/* Popular Badge */}
                                {pacote.destaque && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <div className="flex items-center gap-1.5 bg-accent text-text-main px-4 py-1.5 rounded-full text-sm font-bold shadow-lg whitespace-nowrap">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            Mais Popular
                                        </div>
                                    </div>
                                )}

                                <div className="p-8 flex flex-col flex-1">
                                    {/* Package Name */}
                                    <h3 className={`text-xl font-bold mb-2 ${pacote.destaque ? 'text-white' : 'text-text-main'}`}>
                                        {pacote.titulo || pacote.nome}
                                    </h3>
                                    <p className={`text-sm mb-6 ${pacote.destaque ? 'text-white/80' : 'text-text-muted'}`}>
                                        {pacote.descricao || 'Pacote completo'}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-sm ${pacote.destaque ? 'text-white/60' : 'text-text-muted'}`}>R$</span>
                                            <span className={`text-5xl font-bold ${pacote.destaque ? 'text-white' : 'text-primary'}`}>
                                                {Number(pacote.preco).toLocaleString('pt-BR')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <ul className="flex-1 space-y-3 mb-8">
                                        {itens.map((item, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${pacote.destaque ? 'bg-white/20' : 'bg-primary/10'
                                                    }`}>
                                                    <svg className={`w-3 h-3 ${pacote.destaque ? 'text-white' : 'text-primary'}`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className={`text-sm ${pacote.destaque ? 'text-white/90' : 'text-text-muted'}`}>
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <a
                                        href={`https://wa.me/5518997473445?text=Olá! Tenho interesse no pacote ${pacote.titulo || pacote.nome} - R$ ${Number(pacote.preco).toLocaleString('pt-BR')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-semibold transition-all duration-300 cursor-pointer ${pacote.destaque
                                            ? 'bg-white text-primary hover:bg-white/90 shadow-lg'
                                            : 'bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/20'
                                            }`}
                                    >
                                        <span>Reservar agora</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Checkout Info */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-background-warm px-6 py-3 rounded-full">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-text-muted">
                            Check-out até às{' '}
                            <span className="font-semibold text-text-main">{horarioCheckout || '14:00'}</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}
