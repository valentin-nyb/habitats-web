import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Navbar } from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'habitat.s — The Search Engine for Life',
  description:
    'We index the Soft Data — helping Nomads, Families, and Retirees find their Lifestyle, not just their House.',
  openGraph: {
    title: 'habitat.s',
    description: 'Find your lifestyle, not just a house.',
    siteName: 'habitat.s',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-brand-black text-black dark:text-white transition-colors duration-300 selection:bg-brand-lime selection:text-black">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
