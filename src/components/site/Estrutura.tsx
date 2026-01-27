interface ItemEstrutura {
    nome: string
    icone: string
}

interface EstruturaProps {
    itens?: ItemEstrutura[] | null
}

export default function Estrutura({ itens }: EstruturaProps) {
    const defaultItens = [
        { nome: 'Quiosque 154m²', icone: 'deck' },
        { nome: 'Piscina Grande', icone: 'pool' },
        { nome: '40 Cadeiras', icone: 'event_seat' },
        { nome: '10 Mesas', icone: 'table_restaurant' },
        { nome: '2 Mesas Baralho', icone: 'casino' },
        { nome: 'Mesa Mármore', icone: 'countertops' },
        { nome: 'Internet Wi-Fi', icone: 'wifi' },
        { nome: 'TV', icone: 'tv' },
        { nome: 'Som', icone: 'speaker' },
        { nome: 'Luz de Festa', icone: 'celebration' },
        { nome: 'Churrasqueira', icone: 'outdoor_grill' },
        { nome: 'Gás Cozinha', icone: 'local_fire_department' },
        { nome: '2 Banheiros', icone: 'wc' },
        { nome: 'Cama Elástica', icone: 'sports_gymnastics' },
        { nome: 'Freezer 400L', icone: 'kitchen' },
        { nome: '2 Geladeiras', icone: 'kitchen' },
        { nome: '2 Quiosques', icone: 'yard' },
    ]

    const displayItens = itens && itens.length > 0 ? itens : defaultItens

    return (
        <section className="bg-background-light px-6 py-20 lg:px-20" id="estrutura">
            <div className="mx-auto max-w-[1280px]">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-text-main">Estrutura Completa</h2>
                        <p className="text-text-muted mt-2">Tudo o que você precisa para um dia sem preocupações</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {displayItens.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-xl border border-gray-100 flex flex-col items-center text-center gap-3 hover:border-green-300 transition-colors group"
                        >
                            <span className="material-symbols-outlined text-green-600 text-[32px] group-hover:scale-110 transition-transform">
                                {item.icone}
                            </span>
                            <span className="text-sm font-bold text-text-main">{item.nome}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    <div className="bg-red-50 border border-red-100 rounded-xl px-5 py-3 text-center">
                        <p className="text-sm text-red-700">
                            <span className="font-bold">❌ Não fornecemos:</span> papel higiênico, panelas, talheres, detergente, pano de prato
                        </p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-100 rounded-xl px-5 py-3 text-center">
                        <p className="text-sm text-yellow-800">
                            <span className="font-bold">🛏️ Atenção:</span> Não fornecemos roupa de cama
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
