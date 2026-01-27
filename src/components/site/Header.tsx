'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HeaderProps {
    whatsapp?: string
}

export default function Header({ whatsapp }: HeaderProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const whatsappLink = `https://wa.me/55${whatsapp?.replace(/\D/g, '') || '18997473445'}?text=Olá! Gostaria de mais informações sobre a Estância Menin.`

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#e7f3e9] bg-[#f8fcf9]/95 backdrop-blur-md px-6 py-4 lg:px-20">
            <div className="mx-auto flex max-w-[1280px] items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full bg-primary/20 text-primary-content">
                        <span className="material-symbols-outlined icon-filled text-green-700">nature_people</span>
                    </div>
                    <Link href="/">
                        <h2 className="text-xl font-bold tracking-tight text-text-main">Estância Menin</h2>
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-8">
                    <nav className="flex gap-6">
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#inicio">Início</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#sobre">Sobre</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#estrutura">Estrutura</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#precos">Preços</a>
                        <a className="text-sm font-medium hover:text-primary transition-colors" href="#agenda">Agenda</a>
                        <Link className="text-sm font-medium hover:text-primary transition-colors" href="/faq">FAQ</Link>
                    </nav>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-content hover:bg-green-400 transition-colors shadow-sm shadow-green-200"
                    >
                        <span className="material-symbols-outlined text-[20px]">chat</span>
                        <span>WhatsApp</span>
                    </a>
                </div>

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="lg:hidden p-2 text-text-main"
                >
                    <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-xl transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col p-6 gap-6">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">Menu</span>
                        <button onClick={() => setMobileMenuOpen(false)}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <a className="text-lg font-medium" href="#inicio" onClick={() => setMobileMenuOpen(false)}>Início</a>
                        <a className="text-lg font-medium" href="#sobre" onClick={() => setMobileMenuOpen(false)}>Sobre</a>
                        <a className="text-lg font-medium" href="#estrutura" onClick={() => setMobileMenuOpen(false)}>Estrutura</a>
                        <a className="text-lg font-medium" href="#precos" onClick={() => setMobileMenuOpen(false)}>Preços</a>
                        <a className="text-lg font-medium" href="#agenda" onClick={() => setMobileMenuOpen(false)}>Agenda</a>
                        <Link className="text-lg font-medium" href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
                    </nav>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary py-4 text-base font-bold text-primary-content"
                    >
                        <span className="material-symbols-outlined">chat</span>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </header>
    )
}
