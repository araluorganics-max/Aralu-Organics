import { useState } from 'react';
import { Menu, MessageCircle, Sprout, X } from 'lucide-react';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const NAV_LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#about', label: 'Our Story' },
  { href: '#how-to-use', label: 'How to use' },
  { href: '#ai-ritual-video', label: 'AI Ritual Video' },
  { href: '#video-guide', label: 'Video Guide' },
  { href: '#why-aralu', label: 'Why Aralu' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const whatsappHref = buildWhatsAppUrl('Hi Aralu Organics, I have a question about your products.');

  return (
    <header className="sticky top-0 z-50 border-b border-green/15 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 rounded-md text-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-dark">
          <Sprout className="h-6 w-6 text-amber-dark" strokeWidth={1.75} aria-hidden="true" />
          <span className="font-display text-xl font-semibold tracking-tight">Aralu Organics</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-green transition-colors hover:bg-green/5 hover:text-amber-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-green px-4 text-sm font-medium text-cream transition-colors hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">WhatsApp</span>
            <span className="sr-only sm:hidden">Chat on WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-green/20 text-green transition-colors hover:bg-green/5 lg:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-dark"
          >
            {menuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="border-t border-green/10 bg-cream lg:hidden"
      >
        <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center border-b border-green/10 text-base font-medium text-green last:border-b-0 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-amber-dark"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
