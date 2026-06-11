import type { Metadata } from 'next';
import Providers from '@/components/Providers';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'FUNSA – Funerária Nossa Senhora Aparecida | Avaré/SP',
  description: 'FUNSA - Desde 1943 oferecendo atendimento humanizado 24h, planos de assistência familiar e serviços funerários com dignidade em Avaré/SP.',
  openGraph: {
    title: 'FUNSA – Funerária Nossa Senhora Aparecida',
    description: 'Atendimento humanizado 24h, planos de assistência familiar e serviços funerários com dignidade em Avaré/SP.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>
        <Providers>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
