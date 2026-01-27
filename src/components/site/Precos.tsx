interface Pacote {
    id: string
    titulo: string
    descricao: string
    preco: number
    itens: string[]
    destaque: boolean
    cor_badge: string
}

interface PrecosProps {
    pacotes?: Pacote[] | null
    horarioCheckout?: string | null
}

export default function Precos({ pacotes, horarioCheckout }: PrecosProps) {
    const defaultPacotes: Pacote[] = [
        {
            id: '1',
            titulo: 'Sem Quarto',
            descricao: 'Apenas área externa',
            preco: 550,
            itens: ['Área externa completa', 'Piscina e Quiosque', '40 cadeiras e 10 mesas', 'Churrasqueira e freezer'],
            destaque: false,
            cor_badge: 'gray'
        },
        {
            id: '2',
            titulo: 'Com Ventilador',
            descricao: '1 quarto com ventilador',
            preco: 600,
            itens: ['Tudo do pacote anterior', 'Acesso a 1 quarto', 'Ventilador potente', 'Banheiro privativo'],
            destaque: false,
            cor_badge: 'blue'
        },
        {
            id: '3',
            titulo: 'Com Ar',
            descricao: '1 quarto com ar condicionado',
            preco: 650,
            itens: ['Tudo do pacote anterior', 'Ar-condicionado gelando', 'Conforto térmico total', 'Ideal para o calor'],
            destaque: false,
            cor_badge: 'cyan'
        },
        {
            id: '4',
            titulo: 'Completo',
            descricao: '2 quartos com ar condicionado',
            preco: 700,
            itens: ['Tudo do pacote anterior', 'Acesso a 2 quartos', 'Ambos com ar-condicionado', 'Melhor custo-benefício'],
            destaque: true,
            cor_badge: 'green'
        }
    ]

    const displayPacotes = pacotes && pacotes.length > 0 ? pacotes : defaultPacotes

    return (
        <section className="bg-white px-6 py-20 lg:px-20" id="precos">
            <div className="mx-auto max-w-[1280px]">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-text-main">Valores e Pacotes</h2>
                    <p className="text-text-muted mt-4 text-lg">Diárias das 09:00 às {horarioCheckout || '22:00'}</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {displayPacotes.map((pacote) => (
                        <div
                            key={pacote.id}
                            className={`relative flex flex-col rounded-3xl p-8 transition-all hover:-translate-y-2 border-2 ${pacote.destaque
                                ? 'border-green-500 bg-green-50/30 shadow-xl shadow-green-100 scale-105 z-10'
                                : 'border-gray-100 bg-white'
                                }`}
                        >
                            {pacote.destaque && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                    Mais Popular
                                </span>
                            )}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-text-main">{pacote.titulo}</h3>
                                <p className="text-sm text-gray-500 mt-1">{pacote.descricao}</p>
                            </div>
                            <div className="mb-8">
                                <span className="text-4xl font-extrabold text-green-600">R$ {pacote.preco}</span>
                                <span className="text-gray-400 text-sm ml-1">/diária</span>
                            </div>
                            <ul className="flex-1 space-y-4 mb-8">
                                {pacote.itens.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                                        <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={`https://wa.me/5518997473445?text=Olá! Gostaria de reservar o pacote ${pacote.titulo}.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-4 rounded-xl text-center font-bold transition-all ${pacote.destaque
                                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Reservar Agora
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-16 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <div className="bg-blue-600 text-white rounded-full p-2">
                            <span className="material-symbols-outlined">calendar_today</span>
                        </div>
                        <p className="text-blue-900 font-medium">
                            Durante a semana (seg-sex) temos <strong>promoções especiais</strong>!
                        </p>
                    </div>
                    <div className="flex items-center gap-4 bg-orange-50 p-6 rounded-2xl border border-orange-100">
                        <div className="bg-orange-600 text-white rounded-full p-2">
                            <span className="material-symbols-outlined">local_fire_department</span>
                        </div>
                        <p className="text-orange-900 font-medium">
                            Pacotes de +1 dia com <strong>valores reduzidos</strong>. Consulte!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
