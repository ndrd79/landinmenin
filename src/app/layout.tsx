import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estância Menin | Locação de Chácara em Regente Feijó - SP",
  description: "O melhor espaço para seu lazer e eventos em Regente Feijó. Chácara com piscina quentinha, churrasqueira, área gourmet e conforto para sua família.",
  keywords: ["Estância Menin", "Chácara Regente Feijó", "Lazer Regente Feijó", "Aluguel de Chácara", "Piscina Aquecida", "Eventos Regente Feijó", "Chácara Presidente Prudente"],
  openGraph: {
    title: "Estância Menin | Chácara para Eventos e Lazer",
    description: "Conheça a Estância Menin: piscina, área gourmet e o refúgio perfeito para seus melhores momentos.",
    type: "website",
    locale: "pt_BR",
    url: "https://estanciamenin.com.br", // Ajustar se o domínio for outro
    siteName: "Estância Menin",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
