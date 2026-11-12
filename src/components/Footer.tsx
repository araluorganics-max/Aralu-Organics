import { Sprout } from 'lucide-react';
import { BRAND } from '@/data/siteData';

type FooterProps = {
  onPrivacyClick: () => void;
};

export default function Footer({ onPrivacyClick }: FooterProps) {
  return (
    <footer className="bg-green text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <a href="#top" className="inline-flex items-center gap-2 rounded text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-light">
            <Sprout className="h-6 w-6 text-amber-light" strokeWidth={1.75} aria-hidden="true" />
            <span className="font-display text-xl font-semibold">Aralu Organics</span>
          </a>
          <p className="mt-3 font-kannada text-cream/80" lang="kn">
            ಅರಳು
          </p>
          <p className="mt-2 text-cream/85">{BRAND.tagline}</p>
          <p className="mt-2 text-cream/85">Made With <span className="text-red-500">❤</span> In Karnataka.</p>
        </div>

        <nav aria-label="Legal" className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onPrivacyClick}
            className="inline-flex min-h-11 w-fit items-center rounded text-cream underline decoration-cream/40 underline-offset-4 transition-colors hover:decoration-amber-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-light"
          >
            Privacy policy
          </button>
        </nav>

        <div className="text-sm leading-[1.5] text-cream/85">
          <p className="mt-3">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
