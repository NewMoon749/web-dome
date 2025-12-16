import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EX LEGE-ON - Tu Consulta Legal Inmediata',
  description: 'Consultorio jurídico online. Consultas legales rápidas y accesibles con abogados especializados.',
  icons: {
    icon: [
      { url: '/logo.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '32x32' },
    ],
    shortcut: '/logo.ico',
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

