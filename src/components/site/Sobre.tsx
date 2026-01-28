'use client'

import Image from 'next/image'

interface SobreProps {
    imageUrl?: string
}

export default function Sobre({ imageUrl }: SobreProps) {
    const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvR8TjfjpLN2F9zfuMHzVJO1D5bCU5dg6xJFG2_6FwmLJzqGKDJYzY0-vTHxfaFd4RV1_4lAOGvqME0K5VkYz5LquW2vHVbKqE_Ql'

    const diferenciais = [
        {
            icone: 'nature_people',
            titulo: 'Contato com a Natureza',
            descricao: 'Um ambiente cercado de verde para você relaxar e renovar as energias.'
        },
        {
            icone: 'family_restroom',
            titulo: 'Ambiente Familiar',
            descricao: 'Estrutura pensada para receber todas as gerações com segurança e conforto.'
        },
        {
            icone: 'verified_user',
            titulo: 'Privacidade Total',
            descricao: 'Espaço exclusivo para você e seus convidados, sem preocupações.'
        }
    ]

    return (
        <section className="relative py-24 px-6 lg:px-20 bg-white overflow-hidden" id="sobre">
            {/* Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mt-32" />

            <div className="mx-auto max-w-[1280px]">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Text Side */}
                    <div className="order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 text-primary mb-6">
                            <div className="w-12 h-px bg-primary/30" />
                            <span className="text-sm font-bold uppercase tracking-widest">Nossa História</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-8 leading-tight">
                            Um refúgio feito para <br />
                            <span className="text-primary">criar memórias</span>
                        </h2>
                        <div className="space-y-6 text-lg text-text-muted leading-relaxed mb-12">
                            <p>
                                A Estância Menin nasceu do desejo de oferecer um espaço onde a tranquilidade
                                do campo se encontra com o conforto necessário para momentos especiais.
                            </p>
                            <p>
                                Localizada em Regente Feijó, nossa chácara é o resultado de anos de dedicação
                                para transformar um pedaço de terra em um verdadeiro santuário de lazer
                                e confraternização.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid sm:grid-cols-3 gap-8">
                            {diferenciais.map((item, index) => (
                                <div key={index} className="flex flex-col gap-4 group">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                        <span className="material-symbols-outlined text-[28px]">{item.icone}</span>
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-text-main text-sm">
                                            {item.titulo}
                                        </h3>
                                        <p className="text-xs text-text-muted leading-relaxed">
                                            {item.descricao}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className="relative order-1 lg:order-2 px-4 md:px-0">
                        {/* Main Image */}
                        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/3] bg-gray-100 group">
                            <img
                                src={imageUrl || defaultImage}
                                alt="Área externa da Estância Menin em Regente Feijó"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-text-main/30 via-transparent to-transparent pointer-events-none" />

                            {/* Stats Card - Refined Size */}
                            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-primary/10 transition-transform hover:scale-105 duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-primary">10+</span>
                                        <span className="text-[10px] text-text-muted leading-tight uppercase font-bold tracking-tighter">Anos de<br />exp.</span>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200" />
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-primary">100+</span>
                                        <span className="text-[10px] text-text-muted leading-tight uppercase font-bold tracking-tighter">Famílias<br />felizes</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -z-10 -top-6 -right-6 w-full h-full rounded-[3rem] bg-gradient-to-br from-primary/10 to-transparent border border-primary/5" />
                    </div>
                </div>
            </div>
        </section>
    )
}
