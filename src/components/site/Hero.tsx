interface HeroProps {
    imageUrl?: string
}

export default function Hero({ imageUrl }: HeroProps) {
    const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAXvkkAbQqO2ue5LAh5DPi67pAFNJw5UQ1PLnV9Bg3DvtbZUkE7_UJqjflbqrcT9f-1q-g1PrvSAByxODkuT_qtI_GnFrIwMmYyToMj7cZK4tof_vkSeEj8gMdK5Aoa1Jtn-hHH6wCUVR2EVijlCkbGyY4DwGbkAaNIgya1CYqx3-znhL7ZXDoX6bZb94pXtmCqk9ceZYAidM2eD5vOPHx0OrxMLvF9BrIDaRnpe5jYeP4MgSMlbLRy0IXe4dLbwvJ_V5xadLy9PKmp"

    return (
        <section className="relative px-6 py-12 lg:px-20 lg:py-20" id="inicio">
            <div className="mx-auto max-w-[1280px]">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="flex flex-col gap-6 order-2 lg:order-1">
                        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-main md:text-5xl lg:text-6xl">
                            O lugar ideal para seus <span className="text-green-600">melhores momentos</span>
                        </h1>
                        <p className="text-lg text-text-muted md:text-xl max-w-lg">
                            Desfrute de um ambiente arejado, amplo e tranquilo. O refúgio perfeito na área rural para
                            reunir sua família e amigos com total privacidade.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <a className="flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-primary-content shadow-lg shadow-green-200 hover:bg-green-400 hover:-translate-y-0.5 transition-all"
                                href="#agenda">
                                Ver datas disponíveis
                            </a>
                        </div>
                    </div>
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl bg-gray-100 group">
                            <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${imageUrl || defaultImage}')` }}
                            />
                            {/* Decorative float card */}
                            <div className="absolute -bottom-6 -left-6 hidden md:flex items-center gap-3 rounded-xl bg-white p-4 shadow-xl border border-green-50">
                                <div className="flex -space-x-3">
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDGR-XGdVphF77eV09z-aVDk3WbQNXUILYanat9o-jmpJYOMG4BT2L7Ic-1TiY1Y--ZvBGy0_sIKzr8X-G_WjEpbW_KCeqR2rm7htkLWP5o7Fl6tjqse6uNTP6iSQMlVQEqRY-_So-bZV_AZPgkz-GO4PCJdRAPtfaHMQrPGX2xxeLMokE7eqt5PZIOa2f8mInWZucZucXZ-FKC5zGCkR01DY1bmqnsNMEc39pC6NZlppJLyMr0F03eBLZWVGFKc9JkQ1KoAzJoRyv')" }}></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJKEUL8GgT4-J2lN1KxmsuB3GDTjxM8s_7LS7YYUbKvGiRC4Qm4DQE1oLwuMXpZKetWSG_1aqgvmuLGYRhiaflm9lLqyaH5sc4hwLMT3PUDVmXZwulmdoQRYc-B39itXRHXxQ6yTUpq0yposbvYHm1rifC9GGcvpHulcle-D-2OdEt9xb3iZxDcDiRfAG-HMVcx6N-jVS1X2sSD7v8tFBeRv_gYWLZAFmEdmLunbiPQxs0JzNpD6rNZvIzC_OnKfwXCytg7gpIBb9k')" }}></div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-900">Privacidade Total</span>
                                    <span className="text-[10px] text-gray-500">Espaço exclusivo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
