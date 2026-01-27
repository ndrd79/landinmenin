export default function Regras() {
    const regras = [
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            titulo: 'Horários',
            descricao: 'Check-in às 14h e check-out às 12h. Respeite os horários para não prejudicar outras reservas.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            titulo: 'Capacidade',
            descricao: 'Respeite o limite de pessoas acordado na reserva para garantir o conforto de todos.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
            ),
            titulo: 'Silêncio',
            descricao: 'Som alto permitido apenas até às 22h. Respeite os vizinhos e a tranquilidade do local.',
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
            titulo: 'Limpeza',
            descricao: 'Deixe o espaço organizado. Lixo deve ser descartado nas lixeiras apropriadas.',
        },
    ]

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-gradient-to-br from-primary-dark to-primary overflow-hidden" id="regras">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <svg className="absolute top-0 right-0 w-96 h-96" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="white" />
                </svg>
                <svg className="absolute bottom-0 left-0 w-64 h-64" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="60" fill="white" />
                </svg>
            </div>

            <div className="mx-auto max-w-[1280px] relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-white/60 mb-4">
                        <div className="w-8 h-0.5 bg-white/40 rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Regras de Uso</span>
                        <div className="w-8 h-0.5 bg-white/40 rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Para uma{' '}
                        <span className="text-accent">ótima experiência</span>
                    </h2>
                    <p className="text-lg text-white/70 max-w-2xl mx-auto">
                        Algumas regras simples para garantir que todos aproveitem ao máximo
                    </p>
                </div>

                {/* Rules Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regras.map((regra, index) => (
                        <div
                            key={index}
                            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                        >
                            {/* Icon */}
                            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white mb-4 group-hover:bg-accent group-hover:text-text-main transition-all duration-300">
                                {regra.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-white mb-2">
                                {regra.titulo}
                            </h3>
                            <p className="text-sm text-white/70 leading-relaxed">
                                {regra.descricao}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-12 text-center">
                    <p className="text-white/60 text-sm">
                        Ao fazer uma reserva, você concorda com todas as regras de uso.{' '}
                        <a href="/faq" className="text-accent hover:underline cursor-pointer">
                            Dúvidas frequentes
                        </a>
                    </p>
                </div>
            </div>
        </section>
    )
}
