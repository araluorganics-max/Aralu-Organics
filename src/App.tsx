import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import Benefits from '@/components/Benefits';
import HowToUse from '@/components/HowToUse';
import VideoGuide from '@/components/VideoGuide';
import TrioRitualVideo from '@/components/TrioRitualVideo';
import WhyAralu from '@/components/WhyAralu';
import ComboStrip from '@/components/ComboStrip';
import Faq from '@/components/Faq';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ProductSchema from '@/components/ProductSchema';
import OrderModal from '@/components/OrderModal';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import { OrderModalProvider } from '@/context/OrderModalContext';

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (showPrivacy) {
    return (
      <PrivacyPolicy
        onBackToHome={() => {
          setShowPrivacy(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <OrderModalProvider>
      <div className="min-h-screen bg-cream font-sans text-ink antialiased">
        <a
          href="#products"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-green focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to products
        </a>
        <Header />
        <main>
          <Hero />
          <Products />
          <About />
          <Benefits />
          <HowToUse />
          <TrioRitualVideo />
          <VideoGuide />
          <WhyAralu />
          <ComboStrip />
          <Faq />
          <Contact />
        </main>
        <Footer onPrivacyClick={() => { setShowPrivacy(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        <ProductSchema />
        <OrderModal />
      </div>
    </OrderModalProvider>
  );
}

export default App;
