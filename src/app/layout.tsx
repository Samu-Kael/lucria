import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/layouts/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lucria - Controle Financeiro',
  description: 'Gestão de despesas, receitas e metas financeiras',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen flex`}>
        {/* Sidebar fixa */}
        <Sidebar />

        {/* Conteúdo dinâmico */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </body>
    </html>
  );
}