export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 px-6 py-12 lg:px-20">
            <div className="mx-auto max-w-[1280px]">
                <div className="grid gap-12 lg:grid-cols-4">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <span className="material-symbols-outlined icon-filled">nature_people</span>
                            </div>
                            <h2 className="text-xl font-bold text-white tracking-tight">Estância Menin</h2>
                        </div>
                        <p className="max-w-sm mb-6 text-sm leading-relaxed">
                            Seu refúgio perfeito para celebrações em família e lazer com amigos. Estrutura completa com total privacidade e conforto.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Links Rápidos</h4>
                        <nav className="flex flex-col gap-4 text-sm">
                            <a href="#inicio" className="hover:text-primary transition-colors">Início</a>
                            <a href="#sobre" className="hover:text-primary transition-colors">Sobre</a>
                            <a href="#estrutura" className="hover:text-primary transition-colors">Estrutura</a>
                            <a href="#precos" className="hover:text-primary transition-colors">Preços</a>
                            <a href="/faq" className="hover:text-primary transition-colors">FAQ</a>
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Localização</h4>
                        <p className="text-sm leading-relaxed">
                            Cândido Mota - SP<br />
                            Próximo à Água da Treze<br />
                            CEP: 19860-000
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>© {new Date().getFullYear()} Estância Menin. Todos os direitos reservados.</p>
                    <p>Desenvolvido com ❤️ para momentos especiais.</p>
                </div>
            </div>
        </footer>
    )
}
