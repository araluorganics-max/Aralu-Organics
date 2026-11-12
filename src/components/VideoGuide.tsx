import { useState } from 'react';
import { Play, Sparkles, ExternalLink, CheckCircle2, MessageCircle, Youtube } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useOrderModal } from '@/context/OrderModalContext';
import { PRODUCTS, BRAND, COMBO } from '@/data/siteData';

type VideoClip = {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
  start: number;
  end: number;
  keyPoint: string;
  tag: string;
};

const CLIPS: VideoClip[] = [
  {
    id: 'apply',
    title: 'How to Apply Correctly',
    subtitle: 'Sectioning, warming & scalp massage',
    timestamp: '03:00 - 04:18',
    start: 180,
    end: 258,
    keyPoint:
      'Warm a few teaspoons of castor oil between your palms, part your hair in clean sections, and massage gently into the roots for 5 minutes.',
    tag: 'Step-by-step',
  },
  {
    id: 'choose',
    title: 'Choosing the Right Castor Oil',
    subtitle: 'Why pure cold-pressed is essential',
    timestamp: '01:57 - 03:00',
    start: 117,
    end: 180,
    keyPoint:
      'Always choose 100% pure, cold-pressed castor oil pressed without heat or chemical solvents to protect the natural ricinoleic acid.',
    tag: 'Purity',
  },
  {
    id: 'mask',
    title: 'Ayurvedic Hair Mask & Duration',
    subtitle: 'How long to leave it on & herbal blends',
    timestamp: '04:18 - 06:10',
    start: 258,
    end: 370,
    keyPoint:
      'Leave on for 30 minutes to an hour (or overnight). Combine with herbal powders like rosemary and shikakai for a complete hair cleanse.',
    tag: 'Ayurvedic Ritual',
  },
  {
    id: 'benefits',
    title: 'How Castor Oil Helps Your Hair',
    subtitle: 'Moisture lock & reducing breakage',
    timestamp: '00:55 - 01:57',
    start: 55,
    end: 117,
    keyPoint:
      'The thick fatty acids nourish the scalp barrier, coat the cuticle to prevent brittle breakage, and support natural strand thickness.',
    tag: 'Benefits',
  },
];

const YOUTUBE_VIDEO_ID = 'B2HwM24N6K8';

export default function VideoGuide() {
  const [activeClipIndex, setActiveClipIndex] = useState(0);
  const { openOrderModal } = useOrderModal();

  const currentClip = CLIPS[activeClipIndex];
  const embedUrl = `https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?start=${currentClip.start}&end=${currentClip.end}&rel=0&modestbranding=1`;

  const castorOilProduct = PRODUCTS.find((p) => p.id === 'castor-oil') || PRODUCTS[0];

  return (
    <section id="video-guide" className="scroll-mt-20 border-t border-green/10 bg-[#FAF7F0] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Expert Guidance"
            title="How to Use Castor Oil for Hair Growth"
            description="Watch Dr. Hansaji Yogendra (Director of The Yoga Institute) explain the science, application ritual, and traditional hair mask recipes."
          />
          <a
            href="https://youtu.be/B2HwM24N6K8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold uppercase tracking-wider text-green underline decoration-amber-dark underline-offset-4 hover:text-amber-dark md:self-end"
          >
            <span>Watch full video on YouTube</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Main Cinema Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left/Main Column: Responsive Video Player Frame */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-green/20 bg-green shadow-xl">
              {/* Top Bar with Active Clip indicator and Creator Credit */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-green-700/60 bg-green-900/90 px-4 py-3 text-cream">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-amber-light animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-light">
                    Playing Clip {activeClipIndex + 1} of {CLIPS.length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-800/80 px-2.5 py-0.5 text-[11px] text-cream/90">
                    <Youtube className="h-3 w-3 text-[#FF0000]" />
                    Dr. Hansaji • The Yoga Institute
                  </span>
                  <span className="text-xs text-cream/70 font-mono">{currentClip.timestamp}</span>
                </div>
              </div>

              {/* Responsive 16:9 Iframe */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  key={currentClip.id}
                  src={embedUrl}
                  title={`${currentClip.title} - Dr. Hansaji Castor Oil Guide`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Bottom Clip Summary Banner */}
              <div className="bg-green-900 p-4 sm:p-5 text-cream">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-amber-light/20 px-2.5 py-0.5 text-xs font-semibold text-amber-light">
                    {currentClip.tag}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-cream">
                    {currentClip.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-cream/80 leading-relaxed">
                  💡 <span className="font-medium text-cream">{currentClip.keyPoint}</span>
                </p>
              </div>
            </div>

            {/* Quick Action under video */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-green/15 bg-cream-50 p-4">
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <CheckCircle2 className="h-4 w-4 text-green" />
                <span>Featured product: <strong>Pure Cold-Pressed Castor Oil</strong> (₹150)</span>
              </div>
              <button
                type="button"
                onClick={() => openOrderModal(castorOilProduct, 1)}
                className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2 text-xs font-semibold text-cream transition hover:bg-green-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Order Oil on WhatsApp
              </button>
            </div>
          </div>

          {/* Right Column: Playlist Clip Selectors */}
          <div className="space-y-3 lg:col-span-5">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
                Select a Video Chapter
              </p>
              <span className="text-xs text-ink-muted">Click to jump to clip</span>
            </div>

            <div className="grid gap-3">
              {CLIPS.map((clip, index) => {
                const isActive = activeClipIndex === index;
                return (
                  <button
                    key={clip.id}
                    type="button"
                    onClick={() => setActiveClipIndex(index)}
                    className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                      isActive
                        ? 'border-green bg-green text-cream shadow-md scale-[1.01]'
                        : 'border-green/15 bg-cream hover:border-green/30 hover:bg-cream-50'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                        isActive
                          ? 'bg-amber-light text-green'
                          : 'bg-green/10 text-green group-hover:bg-green group-hover:text-cream'
                      }`}
                    >
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider ${
                            isActive ? 'text-amber-light' : 'text-amber-dark'
                          }`}
                        >
                          {clip.tag}
                        </span>
                        <span
                          className={`font-mono text-xs ${
                            isActive ? 'text-cream/80' : 'text-ink-muted'
                          }`}
                        >
                          {clip.timestamp}
                        </span>
                      </div>

                      <h4
                        className={`mt-1 font-display text-base font-semibold leading-tight ${
                          isActive ? 'text-cream' : 'text-green'
                        }`}
                      >
                        {clip.title}
                      </h4>

                      <p
                        className={`mt-1 text-xs leading-relaxed line-clamp-2 ${
                          isActive ? 'text-cream/85' : 'text-ink-muted'
                        }`}
                      >
                        {clip.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Complete Ritual Offer card */}
            <div className="rounded-2xl border border-amber-dark/20 bg-amber-100/60 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-dark" />
                <h5 className="font-display text-sm font-semibold text-green">
                  Ready to try the complete Ayurvedic ritual?
                </h5>
              </div>
              <p className="mt-1.5 text-xs text-ink-muted leading-relaxed">
                Combine cold-pressed castor oil with rosemary and shikakai powders for the exact ritual recommended by experts.
              </p>
              <button
                type="button"
                onClick={() =>
                  openOrderModal(
                    {
                      id: 'hair-care-trio',
                      name: COMBO.title,
                      size: COMBO.items,
                      price: BRAND.comboPrice,
                      isCombo: true,
                    },
                    1,
                  )
                }
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-green bg-green px-4 py-2 text-xs font-semibold text-cream transition hover:bg-green-700"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Order Complete Trio (₹299) on WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* Video Credits & Attribution Card */}
        <div className="mt-12 rounded-3xl border border-green/15 bg-cream-50 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FF0000]/10 text-[#FF0000]">
                <Youtube className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
                  Video Credits & Attribution
                </p>
                <h4 className="mt-1 font-display text-lg font-semibold text-green sm:text-xl">
                  Dr. Hansaji Yogendra • The Yoga Institute
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-ink-muted">
                  Original Episode:{' '}
                  <span className="font-medium text-ink">
                    &ldquo;How To Use Castor Oil For EXTREME Hair Growth? | Dr. Hansaji&rdquo;
                  </span>
                </p>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed max-w-2xl">
                  Video footage, commentary, and teachings are courtesy of <strong>The Yoga Institute</strong> (est. 1918). All rights belong to the original creators. Clips are featured for educational, traditional wellness and correct application guidance.
                </p>
              </div>
            </div>

            <a
              href="https://youtu.be/B2HwM24N6K8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-green/20 bg-cream px-5 py-3 text-xs font-semibold text-green transition-all hover:border-green hover:bg-green hover:text-cream shadow-sm"
            >
              <Youtube className="h-4 w-4 text-[#FF0000]" />
              <span>Watch Original on YouTube</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

