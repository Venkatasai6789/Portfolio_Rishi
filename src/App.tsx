import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import EducationWalkthrough from './components/EducationWalkthrough';
import Projects from './components/Projects';

import Contact from './components/Contact';
import IntroScreen from './components/IntroScreen';
import SpaceBackground from './components/SpaceBackground';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-brand-black text-zinc-300 flex flex-col relative overflow-x-hidden">
      <SpaceBackground />
      <AnimatePresence mode="wait">
        {showIntro && <IntroScreen key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <div className={`flex flex-col flex-grow transition-opacity duration-1000 ${showIntro ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100 overflow-x-hidden'}`}>

        <Header />
        
        <main className="flex-grow pt-32 pb-20 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto w-full relative z-10">
          <Hero ready={!showIntro} />
          <About />
          <EducationWalkthrough />
          <Projects />

          <Contact />
        </main>
        
        <footer className="mt-auto px-6 md:px-12 lg:px-24 pb-8 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 max-w-[1920px] mx-auto w-full gap-4 z-10 relative">
          <div className="font-mono">&copy; {new Date().getFullYear()} Rishitha Tedlapalli. Built with React.</div>
          <div className="flex gap-6">
            <a href="https://github.com/Rishitha7272" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/rishitha-tedlapalli-558480307/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">LinkedIn</a>
            <a href="https://www.instagram.com/rishiii_tedlapalli/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Instagram</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
