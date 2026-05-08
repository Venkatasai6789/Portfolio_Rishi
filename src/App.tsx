import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import IntroScreen from './components/IntroScreen';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-brand-black text-zinc-300 flex flex-col relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className={`flex flex-col flex-grow transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 overflow-x-hidden'}`}>
        {/* Background radial gradients for ambient glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-purple/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-navy/30 blur-[120px]"></div>
        </div>

        <Header />
        
        <main className="flex-grow pt-32 pb-20 px-6 lg:px-32 max-w-7xl mx-auto w-full relative z-10">
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        
        <footer className="mt-auto px-6 lg:px-32 pb-8 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 max-w-7xl mx-auto w-full gap-4 z-10 relative">
          <div className="font-mono">&copy; {new Date().getFullYear()} Rishitha Tedlapalli. Built with React.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Twitter</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
