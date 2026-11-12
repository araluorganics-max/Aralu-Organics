import { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Droplets,
  Flower2,
  ShieldCheck,
} from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useOrderModal } from '@/context/OrderModalContext';
import { BRAND, COMBO } from '@/data/siteData';

type RitualScene = {
  id: string;
  stepNumber: string;
  productName: string;
  title: string;
  target: string;
  duration: number; // in seconds
  action: string;
  skinTip: string;
  hairTip: string;
  accentColor: string;
  bgGradient: string;
  image?: string;
  icon: typeof Droplets;
};

const RITUAL_SCENES: RitualScene[] = [
  {
    id: 'castor',
    stepNumber: 'Step 01',
    productName: 'Pure Cold-Pressed Castor Oil',
    title: 'Deep Scalp & Brow Nourishment',
    target: 'Hair roots, brows, lashes & dry skin',
    duration: 6,
    image: '/images/ritual-castor.jpg',
    action:
      'Warm 1 to 2 tsp of thick golden castor oil between palms. Massage slowly into the scalp in circular motions for 5 minutes. Tap a single drop onto clean brows & lashes before bed.',
    skinTip: 'Locks deep moisture into dry skin patches & cuticles.',
    hairTip: 'Ricinoleic acid stimulates blood circulation to dormant follicles.',
    accentColor: '#C8861D',
    bgGradient: 'from-[#1F3D2B] via-[#2A4836] to-[#162D20]',
    icon: Droplets,
  },
  {
    id: 'rosemary',
    stepNumber: 'Step 02',
    productName: 'Aromatic Rosemary Powder',
    title: 'Follicle Awakening Herbal Mask',
    target: 'Scalp invigorator & hair strand strengthener',
    duration: 6,
    image: '/images/ritual-rosemary.jpg',
    action:
      'Mix 2 tbsp of finely milled rosemary powder with curd or warm water into a rich herbal paste. Smooth through scalp and strands. Leave for 30 minutes to awaken hair vitality.',
    skinTip: 'Natural antioxidant astringent that clarifies excess oil.',
    hairTip: 'Traditional botanical alternative proven to support hair density.',
    accentColor: '#7E9F80',
    bgGradient: 'from-[#233B2B] via-[#2D4D38] to-[#1B3023]',
    icon: Flower2,
  },
  {
    id: 'shikakai',
    stepNumber: 'Step 03',
    productName: 'Sun-Dried Shikakai Powder',
    title: 'Natural Saponin Gentle Wash',
    target: 'Mild cleansing without stripping moisture',
    duration: 6,
    image: '/images/ritual-shikakai.jpg',
    action:
      'Blend 2 tbsp shikakai powder with warm water. Gently lather onto wet hair and scalp. Rinse thoroughly with water — no synthetic shampoo or harsh sulphates required.',
    skinTip: 'Gentle on skin and scalp barrier, pH balanced by nature.',
    hairTip: 'Natural fruit saponins wash away sebum while preserving strand gloss.',
    accentColor: '#B68B40',
    bgGradient: 'from-[#283827] via-[#354834] to-[#1F2B1E]',
    icon: Droplets,
  },
  {
    id: 'transformation',
    stepNumber: 'Result',
    productName: 'The Complete Aralu Ritual',
    title: 'Lustrous Hair & Blooming Skin',
    target: 'Full hair density, reduced hair fall & natural glow',
    duration: 7,
    image: '/images/ritual-castor.jpg',
    action:
      'Follow this 3-step Ayurvedic cycle 1–2 times per week. Consistent care with single-ingredient botanicals lets your natural hair and skin texture bloom.',
    skinTip: 'Soft, supple skin nourished by pure unrefined botanical lipids.',
    hairTip: 'Noticeable reduction in hair breakage, fuller brows, and root volume.',
    accentColor: '#E3AE55',
    bgGradient: 'from-[#1F3D2B] via-[#375A41] to-[#182F22]',
    icon: Sparkles,
  },
];

export default function TrioRitualVideo() {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100 within current scene
  const [isMuted, setIsMuted] = useState(true);

  const { openOrderModal } = useOrderModal();
  const currentScene = RITUAL_SCENES[currentSceneIndex];
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play subtle soothing chime tone on step change if unmuted
  const playChime = () => {
    if (isMuted) return;
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440 + currentSceneIndex * 110, ctx.currentTime); // Harmonic notes
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch {
      // AudioContext policy fallback
    }
  };

  // Video reel progress timer loop
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50; // update every 50ms
    const totalSteps = (currentScene.duration * 1000) / intervalTime;
    const progressIncrement = 100 / totalSteps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next scene
          const nextIndex = (currentSceneIndex + 1) % RITUAL_SCENES.length;
          setCurrentSceneIndex(nextIndex);
          playChime();
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex, isMuted]);

  const handleNext = () => {
    const nextIndex = (currentSceneIndex + 1) % RITUAL_SCENES.length;
    setCurrentSceneIndex(nextIndex);
    setProgress(0);
    playChime();
  };

  const handlePrev = () => {
    const prevIndex = (currentSceneIndex - 1 + RITUAL_SCENES.length) % RITUAL_SCENES.length;
    setCurrentSceneIndex(prevIndex);
    setProgress(0);
    playChime();
  };

  const handleSelectScene = (index: number) => {
    setCurrentSceneIndex(index);
    setProgress(0);
    playChime();
  };

  const handleRestart = () => {
    setCurrentSceneIndex(0);
    setProgress(0);
    setIsPlaying(true);
  };

  const handleOrderTrio = () => {
    openOrderModal(
      {
        id: 'hair-care-trio',
        name: COMBO.title,
        size: COMBO.items,
        price: BRAND.comboPrice,
        isCombo: true,
      },
      1,
    );
  };

  return (
    <section id="ai-ritual-video" className="scroll-mt-20 border-t border-green/10 bg-[#FAF7F2] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="AI Ritual Simulation"
            title="How the Trio Transforms Hair & Skin"
            description="Experience the step-by-step Ayurvedic synergy of cold-pressed castor oil, rosemary powder, and shikakai cleanser."
          />
          <div className="flex items-center gap-2 self-start md:self-end">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-green/20 bg-cream px-3 py-1 text-xs font-semibold uppercase tracking-wider text-green">
              <Sparkles className="h-3.5 w-3.5 text-amber-dark" />
              AI Animated Video Walkthrough
            </span>
          </div>
        </div>

        {/* Video Reel Cinema Showcase */}
        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-12">
          {/* Main Simulated Video Screen (9:16 vertical cinema style) */}
          <div className="relative overflow-hidden rounded-[32px] border border-green/20 bg-green-900 shadow-2xl lg:col-span-7">
            {/* Background Animated Gradient Scene */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${currentScene.bgGradient} transition-all duration-1000`}
            />

            {/* Optional AI Generated Cinematic Image Layer */}
            {currentScene.image && (
              <img
                key={currentScene.id}
                src={currentScene.image}
                alt={currentScene.title}
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
                className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-luminosity filter contrast-125 transition-all duration-[6000ms] ease-out scale-105"
              />
            )}

            {/* Subtle botanical decorative watermarks */}
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-amber-light/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-cream/10 blur-3xl" />

            {/* Video Overlay Content */}
            <div className="relative flex min-h-[500px] flex-col justify-between p-6 sm:min-h-[560px] sm:p-8 text-cream">
              {/* Top Story Timeline Progress Bars */}
              <div>
                <div className="flex gap-2">
                  {RITUAL_SCENES.map((scene, idx) => {
                    let fillWidth = '0%';
                    if (idx < currentSceneIndex) fillWidth = '100%';
                    else if (idx === currentSceneIndex) fillWidth = `${progress}%`;

                    return (
                      <button
                        key={scene.id}
                        type="button"
                        onClick={() => handleSelectScene(idx)}
                        aria-label={`Jump to ${scene.stepNumber}`}
                        className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-cream/20 hover:bg-cream/40"
                      >
                        <div
                          className="h-full bg-amber-light transition-all duration-75"
                          style={{ width: fillWidth }}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Top Video Header: Live Badge + Sound Control */}
                <div className="mt-4 flex items-center justify-between text-xs text-cream/80">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 font-mono uppercase tracking-wider backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-amber-light animate-ping" />
                    {currentScene.stepNumber} of 04
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="rounded-full bg-black/30 p-2 text-cream hover:bg-black/50 transition backdrop-blur-sm"
                      aria-label={isMuted ? 'Unmute chime audio' : 'Mute chime audio'}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-amber-light" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Center Scene Presentation */}
              <div className="my-auto py-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-cream/20 bg-cream/10 backdrop-blur-md shadow-inner transition-transform duration-700 hover:scale-105">
                  <currentScene.icon className="h-10 w-10 text-amber-light" />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-light">
                    {currentScene.productName}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-cream sm:text-3xl">
                    {currentScene.title}
                  </h3>
                  <p className="mt-2 text-xs font-medium text-cream/70">
                    🎯 Target: {currentScene.target}
                  </p>
                </div>

                {/* Dynamic Action Description Card */}
                <div className="mx-auto mt-6 max-w-lg rounded-2xl border border-cream/15 bg-black/25 p-5 backdrop-blur-md">
                  <p className="text-sm leading-relaxed text-cream/90 font-sans">
                    {currentScene.action}
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-2.5 border-t border-cream/10 pt-3 text-xs sm:grid-cols-2">
                    <div className="flex items-start gap-1.5 text-cream/80">
                      <span className="font-bold text-amber-light">🌿 Hair:</span>
                      <span>{currentScene.hairTip}</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-cream/80">
                      <span className="font-bold text-amber-light">✨ Skin:</span>
                      <span>{currentScene.skinTip}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Video Controls & Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="rounded-full bg-black/30 p-2 text-cream hover:bg-black/50 transition backdrop-blur-sm"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-amber-light px-4 py-2 text-xs font-bold text-green transition hover:bg-cream"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="rounded-full bg-black/30 p-2 text-cream hover:bg-black/50 transition backdrop-blur-sm"
                    aria-label="Next step"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    className="rounded-full bg-black/30 p-2 text-cream/80 hover:text-cream transition backdrop-blur-sm"
                    aria-label="Restart video"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleOrderTrio}
                  className="inline-flex items-center gap-1.5 rounded-full bg-cream px-5 py-2 text-xs font-bold text-green shadow-lg transition hover:bg-amber-light hover:text-green"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  <span>Order the Trio (₹{BRAND.comboPrice})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Interactive Scene Cards */}
          <div className="flex flex-col justify-between space-y-3 lg:col-span-5">
            <div className="flex items-center justify-between px-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-dark">
                The 3-Step Ayurvedic Cycle
              </p>
              <span className="text-xs text-ink-muted">Click step to preview</span>
            </div>

            <div className="grid gap-3">
              {RITUAL_SCENES.map((scene, index) => {
                const isSelected = currentSceneIndex === index;
                return (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => handleSelectScene(index)}
                    className={`group flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                      isSelected
                        ? 'border-green bg-green text-cream shadow-md scale-[1.01]'
                        : 'border-green/15 bg-cream hover:border-green/30 hover:bg-cream-50'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition ${
                        isSelected
                          ? 'bg-amber-light text-green'
                          : 'bg-green/10 text-green group-hover:bg-green group-hover:text-cream'
                      }`}
                    >
                      <scene.icon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wider ${
                            isSelected ? 'text-amber-light' : 'text-amber-dark'
                          }`}
                        >
                          {scene.stepNumber}
                        </span>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[11px] font-medium text-amber-light">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-light animate-ping" />
                            Active Scene
                          </span>
                        )}
                      </div>

                      <h4
                        className={`mt-1 font-display text-base font-semibold leading-tight ${
                          isSelected ? 'text-cream' : 'text-green'
                        }`}
                      >
                        {scene.title}
                      </h4>

                      <p
                        className={`mt-1 text-xs leading-relaxed line-clamp-2 ${
                          isSelected ? 'text-cream/85' : 'text-ink-muted'
                        }`}
                      >
                        {scene.productName} • {scene.target}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Value Callout Card */}
            <div className="rounded-2xl border border-green/15 bg-cream p-5 text-sm">
              <div className="flex items-center gap-2 font-semibold text-green">
                <ShieldCheck className="h-5 w-5 text-amber-dark" />
                <span>Why Use All 3 Together?</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">
                Castor oil locks deep lipid nourishment, Rosemary activates micro-circulation in the scalp, and Shikakai washes cleanly without stripping natural protective oils. Together, they create a complete holistic ritual.
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-green/10 pt-3 text-xs">
                <span className="font-medium text-green">Special Trio Box: <strong>₹{BRAND.comboPrice}</strong></span>
                <span className="text-ink-muted line-through">₹330</span>
                <span className="rounded bg-green/10 px-2 py-0.5 font-bold text-green">Save ₹31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
