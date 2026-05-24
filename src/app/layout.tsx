import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Eco Lodge CRM',
  description: 'Sistema de CRM e Relatórios para Eco Lodge Praia de Gravatá',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="bg-cream h-full">
        {children}
      </body>
    </html>
  );
}
