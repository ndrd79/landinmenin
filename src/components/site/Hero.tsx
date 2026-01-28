'use client'

import Image from 'next/image'

interface HeroProps {
    imageUrl?: string
}

export default function Hero({ imageUrl }: HeroProps) {
    const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXvR8TjfjpLN2F9zfuMHzVJO1D5bCU5dg6xJFG2_6FwmLJzqGKDJYzY0-vTHxfaFd4RV1_4lAOGvqME0K5VkYz5LquW2vHVbKqE_Ql'

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-20 overflow-hidden bg-background-light" id="inicio">
            {/* Background Decorative Circles */}
            <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[30%] h-[50%] bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

            <div className="mx-auto max-w-[1280px] w-full relative z-10 pt-16 lg:pt-0">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Content */}
                    <div className="relative order-2 lg:order-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-8 animate-fade-in border border-primary/20">
                            <span className="material-symbols-outlined text-[18px]">verified</span>
                            <span>A melhor chácara da região</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-text-main">
                            O lugar ideal para seus{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-primary">melhores momentos</span>
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 200 12" preserveAspectRatio="none">
                                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                            {' '}em <span className="text-secondary-dark">Lucélia - SP</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-text-muted mt-6 max-w-lg leading-relaxed">
                            Desfrute de um ambiente arejado, amplo e tranquilo. O refúgio perfeito para
                            reunir sua família e amigos com total privacidade e conforto.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-10">
                            <a
                                href="#agenda"
                                className="group flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
                            >
                                <span>Ver datas disponíveis</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="#estrutura"
                                className="flex items-center justify-center gap-2 h-14 px-8 rounded-2xl bg-white border-2 border-primary/20 text-text-main font-semibold hover:border-primary/40 hover:bg-primary/5 active:scale-95 transition-all duration-300 cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Ver estrutura</span>
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 pt-12">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center overflow-hidden"
                                        >
                                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-text-main">+100 famílias</span>
                                    <span className="text-xs text-text-muted">já se hospedaram</span>
                                </div>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-bold text-text-main">5.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative order-1 lg:order-2 px-4 md:px-0">
                        {/* Main Image with Smooth Organic Shape */}
                        <div className="relative group">
                            <div
                                className="aspect-[4/3] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 bg-gray-100 relative"
                            >
                                <img
                                    src={imageUrl || defaultImage}
                                    alt="Estância Menin - Piscina e Área de Lazer em Lucélia"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-text-main/20 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Floating Card - Top Right */}
                            <div className="absolute -top-3 -right-2 sm:-top-4 sm:-right-4 flex items-center gap-2 sm:gap-3 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-primary/10 animate-float scale-90 sm:scale-100 origin-right z-20">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm font-bold text-text-main">Área Rural</span>
                                    <span className="text-[10px] sm:text-xs text-text-muted">Ar puro e natureza</span>
                                </div>
                            </div>

                            {/* Floating Card - Bottom Left */}
                            <div className="absolute -bottom-3 -left-2 sm:-bottom-4 sm:-left-4 flex items-center gap-2 sm:gap-3 bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-primary/10 scale-90 sm:scale-100 origin-left z-20" style={{ animationDelay: '0.5s' }}>
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-accent/30 to-secondary/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm font-bold text-text-main">Privacidade Total</span>
                                    <span className="text-[10px] sm:text-xs text-text-muted">Espaço exclusivo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
