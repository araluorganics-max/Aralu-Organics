type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
};

export default function SectionHeading({ eyebrow, title, description, align = 'left', tone = 'light' }: SectionHeadingProps) {
  const isDark = tone === 'dark';
  return (
    <header className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-amber-light' : 'text-amber-dark'}`}>
        {eyebrow}
      </p>
      <h2
        className={`mt-2.5 font-display text-3xl font-semibold leading-[1.2] tracking-tight sm:text-4xl ${
          isDark ? 'text-cream' : 'text-green'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3.5 text-base leading-relaxed sm:text-lg ${isDark ? 'text-cream/85' : 'text-ink-muted'}`}>
          {description}
        </p>
      )}
    </header>
  );
}
