interface SobreProps {
    imageUrl?: string
}

export default function Sobre({ imageUrl }: SobreProps) {
    const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuDXvR8TjfjpLN2F9zfuMHzVJO1D5bCU5dg6xJFG2_6FwmLJzqGKDJYzY0-vTHxfaFd4RV1_4lAOGvqME0K5VkYz5LquW2vHVbKqE_Ql"
    const destaques = [
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            titulo: 'Espaço Amplo',
            descricao: 'Ambiente espaçoso para toda a família curtir com conforto'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            titulo: 'Contato com a Natureza',
            descricao: 'Área rural tranquila com ar puro e muito verde'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            ),
            titulo: 'Privacidade Total',
            descricao: 'Espaço exclusivo para seu grupo sem interferências'
        },
        {
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
            ),
            titulo: 'Momentos Especiais',
            descricao: 'Ideal para celebrações e encontros em família'
        },
    ]

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-background-warm overflow-hidden" id="sobre">
            {/* Organic Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                <svg className="absolute top-0 left-0 w-64 h-64 text-primary/5" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="currentColor" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-96 h-96 text-secondary/5" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="currentColor" />
                </svg>
            </div>

            <div className="mx-auto max-w-[1280px] relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Content Side */}
                    <div className="flex flex-col gap-8">
                        {/* Section Label */}
                        <div className="inline-flex items-center gap-2 text-primary">
                            <div className="w-8 h-0.5 bg-primary rounded-full" />
                            <span className="text-sm font-semibold uppercase tracking-wide">Sobre Nós</span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main leading-tight">
                            Um refúgio para{' '}
                            <span className="text-primary">reconectar</span>{' '}
                            com o que importa
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-text-muted leading-relaxed">
                            A Estância Menin é um espaço rural cuidadosamente preparado para oferecer
                            a você e sua família momentos inesquecíveis. Aqui, a natureza se encontra
                            com o conforto, criando o cenário perfeito para descanso e celebrações.
                        </p>

                        {/* Highlights Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {destaques.map((item, index) => (
                                <div
                                    key={index}
                                    className="group flex items-start gap-4 p-5 bg-white rounded-2xl border border-primary/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary group-hover:from-primary group-hover:to-primary-light group-hover:text-white transition-all duration-300">
                                        {item.icon}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-bold text-text-main group-hover:text-primary transition-colors">
                                            {item.titulo}
                                        </h3>
                                        <p className="text-sm text-text-muted leading-relaxed">
                                            {item.descricao}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative">
                        {/* Main Image */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10">
                            <img
                                src={imageUrl || defaultImage}
                                alt="Área externa da Estância Menin"
                                className="w-full aspect-[4/3] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-main/30 via-transparent to-transparent" />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-primary/10" />

                        {/* Stats Card - Refined Size */}
                        <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-primary/10 transition-transform hover:scale-105 duration-300">
                            <div className="flex items-center gap-4">
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-primary">10+</span>
                                    <span className="text-[10px] text-text-muted leading-tight">Anos de<br />experiência</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="text-center">
                                    <span className="block text-2xl font-bold text-primary">100+</span>
                                    <span className="text-[10px] text-text-muted leading-tight">Famílias<br />atendidas</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
