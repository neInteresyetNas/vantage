import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ProgressProvider } from '@/lib/useProgress';
import { SettingsProvider } from '@/lib/settings';
import { Header } from '@/components/Header';
export const metadata: Metadata = { title: 'VANTAGE — MW4 Camo Tracker', description: 'Track every MW4 camo. Complete every challenge.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="text-zinc-100 antialiased"><SettingsProvider><ProgressProvider><Header />
    <main className="mx-auto max-w-6xl overflow-x-hidden p-4">{children}</main></ProgressProvider></SettingsProvider></body></html>;
}
