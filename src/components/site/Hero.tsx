interface HeroProps {
    imageUrl?: string
}

export default function Hero({ imageUrl }: HeroProps) {
    const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAXvkkAbQqO2ue5LAh5DPi67pAFNJw5UQ1PLnV9Bg3DvtbZUkE7_UJqjflbqrcT9f-1q-g1PrvSAByxODkuT_qtI_GnFrIwMmYyToMj7cZK4tof_vkSeEj8gMdK5Aoa1Jtn-hHH6wCUVR2EVijlCkbGyY4DwGbkAaNIgya1CYqx3-znhL7ZXDoX6bZb94pXtmCqk9ceZYAidM2eD5vOPHx0OrxMLvF9BrIDaRnpe5jYeP4MgSMlbLRy0IXe4dLbwvJ_V5xadLy9PKmp"

    return (
        <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-20 overflow-hidden bg-background-light" id="inicio">
            {/* Organic Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 -left-20 w-72 h-72 bg-gradient-to-tr from-accent/20 to-secondary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-t from-primary/5 to-transparent rounded-full blur-2xl" />
            </div>

            <div className="mx-auto max-w-[1280px] w-full relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
                    {/* Content */}
                    <div className="flex flex-col gap-8 order-2 lg:order-1">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full w-fit">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium">Refúgio exclusivo na área rural</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-text-main">
                            O lugar ideal para seus{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-primary">melhores momentos</span>
                                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/20" viewBox="0 0 200 12" preserveAspectRatio="none">
                                    <path d="M0,8 Q50,0 100,8 T200,8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-text-muted max-w-lg leading-relaxed">
                            Desfrute de um ambiente arejado, amplo e tranquilo. O refúgio perfeito para
                            reunir sua família e amigos com total privacidade.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="#agenda"
                                className="group flex items-center gap-2 h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <span>Ver datas disponíveis</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="#estrutura"
                                className="flex items-center gap-2 h-14 px-8 rounded-2xl bg-white border-2 border-primary/20 text-text-main font-semibold hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                            >
                                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>Ver estrutura</span>
                            </a>
                        </div>

                        {/* Trust Indicators */}
                        <div className="flex items-center gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div
                                            key={i}
                                            className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center"
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
                                        <svg key={i} className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-sm font-semibold text-text-main">5.0</span>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="relative order-1 lg:order-2">
                        {/* Main Image with Organic Shape */}
                        <div className="relative">
                            <div
                                className="aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 group"
                                style={{
                                    clipPath: 'polygon(0% 5%, 95% 0%, 100% 95%, 5% 100%)',
                                }}
                            >
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url('${imageUrl || defaultImage}')` }}
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-text-main/20 via-transparent to-transparent" />
                            </div>

                            {/* Floating Card - Top Right */}
                            <div className="absolute -top-4 -right-4 hidden md:flex items-center gap-3 bg-white rounded-2xl p-4 shadow-xl border border-primary/10 animate-float">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-text-main">Área Rural</span>
                                    <span className="text-xs text-text-muted">Ar puro e natureza</span>
                                </div>
                            </div>

                            {/* Floating Card - Bottom Left */}
                            <div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-3 bg-white rounded-2xl p-4 shadow-xl border border-primary/10" style={{ animationDelay: '0.5s' }}>
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-secondary/20 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-text-main">Privacidade Total</span>
                                    <span className="text-xs text-text-muted">Espaço exclusivo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
                <span className="text-xs text-text-muted font-medium">Role para explorar</span>
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    )
}
