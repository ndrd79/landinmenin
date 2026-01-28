'use client'

export default function Localizacao() {
    return (
        <section className="relative py-24 px-6 lg:px-20 bg-white overflow-hidden" id="localizacao">
            <div className="mx-auto max-w-[1280px]">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Como chegar</span>
                        <div className="w-8 h-0.5 bg-primary rounded-full" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-main mb-4">
                        Nossa <span className="text-primary">Localização</span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Estamos localizados em uma área de fácil acesso em Regente Feijó. Venha nos visitar!
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Info Card */}
                    <div className="bg-background-warm p-8 rounded-[2.5rem] border border-primary/10 shadow-xl lg:col-span-1">
                        <div className="space-y-8">
                            <div>
                                <div className="flex items-center gap-3 text-primary mb-3">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <h4 className="font-bold text-text-main">Endereço</h4>
                                </div>
                                <p className="text-text-muted leading-relaxed">
                                    Regente Feijó - SP<br />
                                    A Estância Menin fica próxima ao centro da cidade, facilitando o seu deslocamento.
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-3 text-primary mb-3">
                                    <span className="material-symbols-outlined">directions_car</span>
                                    <h4 className="font-bold text-text-main">Ponto de Referência</h4>
                                </div>
                                <p className="text-text-muted leading-relaxed">
                                    Acesso fácil pela rodovia, com sinalização clara até a entrada da estância.
                                </p>
                            </div>

                            <div className="pt-6">
                                <a
                                    href="https://www.google.com/maps/dir//Est%C3%A2ncia+Menin/@-21.7407769,-51.0313308,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x9496a1a1ea666099:0x6a85e5551172d50!2m2!1d-51.0313308!2d-21.7407769"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 w-full"
                                >
                                    <span className="material-symbols-outlined">map</span>
                                    Abrir no GPS
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-2 h-[450px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white relative group">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3695.531238479549!2d-51.03390572382024!3d-21.740771897455087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9496a1a1ea666099%3A0x6a85e5551172d50!2sEst%C3%A2ncia%20Menin!5e0!3m2!1spt-BR!2sbr!4v1706390123456!5m2!1spt-BR!2sbr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa Estância Menin"
                            className="grayscale-[0.2] contrast-[1.1]"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}
