import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const [phase, setPhase] = useState<'hidden' | 'title' | 'description'>('hidden');

  useEffect(() => {
    if (isInView && phase === 'hidden') {
      setPhase('title');
      
      const timer = setTimeout(() => {
        setPhase('description');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, phase]);

  const aboutText = "I'm a passionate AI enthusiast and software engineer, specializing in building intelligent systems and intuitive web experiences. I constantly explore deep learning, tackle challenging problems, and bring creative ideas to life through code.";

  return (
    <section id="about" className="relative min-h-[50vh] flex flex-col justify-center py-10 w-full" ref={containerRef}>
      <div className="w-full flex items-center mb-16">
        <div className="w-12 h-[1px] bg-gradient-to-r from-[#4facfe] to-transparent"></div>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      </div>
      
      <div className="w-full flex items-center justify-center min-h-[300px]">
        <AnimatePresence mode="wait">
          {phase === 'title' && (
            <motion.div 
              key="title"
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)", transition: { duration: 0.8 } }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative inline-block"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3], rotate: [0, 90, 180] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-8 text-blue-300 w-8 h-8"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="currentColor"/>
                </svg>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], rotate: [0, -90, -180] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-10 text-purple-300 w-10 h-10"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L13.2 7.8L21 9L13.2 10.2L12 18L10.8 10.2L3 9L10.8 7.8L12 0Z" fill="currentColor"/>
                </svg>
              </motion.div>

              <h2 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(196,113,237,0.3)] relative z-10 px-4 py-2">
                About me ?
              </h2>
            </motion.div>
          )}

          {phase === 'description' && (
            <motion.div 
              key="description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl text-center px-4"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-light text-[#4facfe] leading-relaxed drop-shadow-[0_0_10px_rgba(79,172,254,0.3)]">
                {aboutText.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.03, duration: 0 }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-[3px] h-[1em] bg-[#4facfe] align-middle ml-1 -mt-1"
                />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
