export default function Regras() {
    const rules = [
        {
            title: 'Como Reservar',
            icon: 'account_balance',
            items: [
                'Depósito reserva mínimo de R$200,00',
                'O saldo deve ser quitado até a data',
                'Pode levar as bebidas um dia antes para gelar',
                'O locatário é responsável pela limpeza de churrasqueira e freezer'
            ],
            color: 'bg-green-50 text-green-700 border-green-100'
        },
        {
            title: 'Cancelamento',
            icon: 'event_busy',
            items: [
                'O valor do depósito não é reembolsável',
                'Troca de data permitida com 15 dias de antecedência',
                'Cancelamentos com menos de 15 dias perdem o sinal',
                'Sujeito a disponibilidade de data para reagendamento'
            ],
            color: 'bg-red-50 text-red-700 border-red-100'
        },
        {
            title: 'Pagamento',
            icon: 'credit_card',
            items: [
                'Parcelamos no cartão em até 12x (juros p/ locatário)',
                'Aceitamos PIX com chave celular',
                'Dinheiro em espécie aceito na entrega das chaves',
                'Emitimos recibo de locação para sua segurança'
            ],
            color: 'bg-blue-50 text-blue-700 border-blue-100'
        }
    ]

    return (
        <section className="bg-background-light px-6 py-20 lg:px-20" id="regras">
            <div className="mx-auto max-w-[1280px]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-text-main md:text-4xl">Regras e Informações</h2>
                    <div className="h-1 w-20 bg-primary mx-auto mt-4 rounded-full"></div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {rules.map((rule, idx) => (
                        <div key={idx} className={`p-8 rounded-3xl border ${rule.color}`}>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-symbols-outlined text-[32px]">{rule.icon}</span>
                                <h3 className="text-xl font-bold">{rule.title}</h3>
                            </div>
                            <ul className="space-y-4">
                                {rule.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm font-medium opacity-90">
                                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current shrink-0"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
