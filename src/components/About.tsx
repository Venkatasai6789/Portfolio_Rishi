import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Placeholder — replace with actual bio later
const ABOUT_TEXT =
  "Driven, ambitious, and highly improvement-focused, with a strong tendency to aim beyond average standards and constantly seek higher levels of growth. Naturally curious and proactive in exploring new ideas, especially in areas involving innovation, creativity, and impactful problem-solving. Shows a combination of technical thinking and practical execution, with the ability to quickly learn, adapt, and independently build solutions from ideas. \n\nPossesses a competitive mindset balanced with collaboration and leadership qualities, often taking initiative in team environments and community activities. Strong attention toward self-development, presentation, and personal branding reflects confidence, determination, and a desire to stand out. Maintains persistence under pressure, values consistency and discipline, and approaches goals with a future-oriented mindset and high aspirations for success.";

const hobbiesList = [
  "Listening to Music",
  "Travelling and Exploring",
  "Fitness & Walking",
  "Exploring Tech",
  "WEB development",
  "Sketching/digital art",
  "Watching documentaries"
];

const hobbyPositions = [
  { left: '5%', top: '100%' },
  { left: '18.18%', top: '36.37%' },
  { left: '50%', top: '10%' },
  { left: '81.81%', top: '36.37%' },
  { left: '95%', top: '100%' }
];

const TITLE = "About me?";
const CHAR_COUNT = TITLE.length; // 9

// Each char gets this slice of the 1-second window
const STAGGER = 1 / CHAR_COUNT; // ~0.111s per char
const CHAR_ANIM_DURATION = 0.25;  // how long each char's own fade takes
const TYPEWRITER_DELAY = 0.034;   // seconds per character for the paragraph

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  /**
   * Phases:
   *  idle        → waiting for section to enter viewport
   *  title-in    → chars appearing A → ? over 1s
   *  title-hold  → fully visible, 2s pause
   *  title-out   → chars disappearing A → ? over 1s
   *  typewriter  → paragraph types out
   */
  const [phase, setPhase] = useState<'idle' | 'title-in' | 'title-hold' | 'title-out' | 'typewriter'>('idle');
  const [hasTriggered, setHasTriggered] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showHobbies, setShowHobbies] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [skipTypewriter, setSkipTypewriter] = useState(false);
  
  const hobbiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showHobbies) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % hobbiesList.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [showHobbies]);

  const handleShowHobbies = () => {
    setShowHobbies(true);
    setTimeout(() => {
      hobbiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // Fire once when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          setPhase('title-in');
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  // Phase sequencing with precise timings
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    if (phase === 'title-in') {
      // Wait for all chars to finish appearing: 1000ms
      t = setTimeout(() => setPhase('title-hold'), 1000);
    }
    if (phase === 'title-hold') {
      // Hold for 2 seconds
      t = setTimeout(() => setPhase('title-out'), 2000);
    }
    if (phase === 'title-out') {
      // Wait for all chars to finish disappearing: 1000ms
      t = setTimeout(() => setPhase('typewriter'), 1000);
    }

    return () => clearTimeout(t);
  }, [phase]);

  // Is the title currently being shown (in or hold)?
  const titleVisible = phase === 'title-in' || phase === 'title-hold';
  // Is the title currently disappearing?
  const titleExiting = phase === 'title-out';

  return (
    <section
      id="about"
      className="relative min-h-[60vh] flex flex-col justify-center py-16 w-full"
      ref={sectionRef}
    >
      {/* ── Section divider ──────────────────────────────────────────── */}
      <div className="w-full flex items-center gap-4 mb-20">
        {/* Left arm — blue → transparent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
          className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#4facfe]/60 to-[#4facfe]/20"
        />

        {/* Centre — glowing glass orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0"
        >
          {/* Outer glow ring */}
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.25, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4facfe]/30 to-[#c471ed]/30 blur-[8px]"
          />

          {/* Glass pill */}
          <div
            className="relative w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(79,172,254,0.15), rgba(196,113,237,0.1))',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 0 20px rgba(79,172,254,0.2), inset 0 1px 0 rgba(255,255,255,0.2)',
            }}
          >
            {/* Rotating sparkle star */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 text-[#c471ed]"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z"
                  fill="url(#starGrad)"
                />
                <defs>
                  <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4facfe" />
                    <stop offset="100%" stopColor="#c471ed" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Right arm — purple → transparent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 1 }}
          className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#c471ed]/60 to-[#c471ed]/20"
        />
      </div>

      {/* Animation stage */}
      <div className="w-full flex items-center justify-center min-h-[280px]">

        {/* ── Title: appear + hold + disappear ───────────────────────── */}
        {(titleVisible || titleExiting) && (
          <div className="relative inline-block select-none">

            {/* Sparkle – top-left */}
            {titleVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -top-6 -left-8 text-blue-300 w-8 h-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.4, 1, 0.4], rotate: [0, 180, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="currentColor" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* Sparkle – bottom-right */}
            {titleVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="absolute -bottom-4 -right-10 text-purple-300 w-10 h-10"
              >
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], rotate: [0, -180, -360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 0L13.2 7.8L21 9L13.2 10.2L12 18L10.8 10.2L3 9L10.8 7.8L12 0Z" fill="currentColor" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* The title — per-character animation */}
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight relative z-10 px-4 py-2 flex">
              {TITLE.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(196,113,237,0.35)] inline-block"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                  // APPEAR: opacity 0→1, slide up
                  initial={
                    titleVisible
                      ? { opacity: 0, y: 20, filter: 'blur(6px)' }
                      : { opacity: 1, y: 0, filter: 'blur(0px)' }
                  }
                  animate={
                    titleVisible
                      ? { opacity: 1, y: 0, filter: 'blur(0px)' }     // appearing
                      : { opacity: 0, y: -12, filter: 'blur(6px)' }   // disappearing
                  }
                  transition={{
                    delay: i * STAGGER,
                    duration: CHAR_ANIM_DURATION,
                    ease: titleVisible ? 'easeOut' : 'easeIn',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </h2>
          </div>
        )}

        {/* ── Glass card with typewriter ───────────────────────────────── */}
        {phase === 'typewriter' && (
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[92%] max-w-[1400px]"
          >
            {/* Ambient glow orbs behind the card */}
            <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#4facfe]/10 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-[#c471ed]/10 blur-[60px] pointer-events-none" />

            {/* Glass card */}
            <div
              onClick={() => {
                setPhase('title-in');
                setTypewriterDone(false);
                setSkipTypewriter(false);
                setShowHobbies(false);
              }}
              className="relative rounded-3xl overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(24px) saturate(180%)',
                WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {/* Top shimmer line */}
              <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Inner content */}
              <div className="px-8 py-16 md:px-12 md:py-24">


                {/* Typewriter text */}
                <p className="text-base md:text-lg lg:text-xl font-light text-zinc-200 leading-relaxed text-justify">
                  {ABOUT_TEXT.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ 
                        delay: skipTypewriter ? 0 : 0.35 + i * TYPEWRITER_DELAY, 
                        duration: 0 
                      }}
                      onAnimationComplete={() => {
                        if (i === ABOUT_TEXT.length - 1) {
                          setTypewriterDone(true);
                        }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.85, ease: 'linear' }}
                    className="inline-block w-[2px] h-[1em] bg-[#4facfe] align-middle ml-[3px] rounded-sm"
                  />
                </p>

                {/* Know more about me Button */}
                <AnimatePresence>
                  {typewriterDone && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="mt-12 flex justify-center"
                    >
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowHobbies();
                        }}
                        className="group relative text-sm md:text-base font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        Know more about me
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#4facfe] to-[#c471ed] origin-left transition-transform group-hover:scale-x-105"></span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom shimmer line */}
              <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Hobbies & Education Section */}
            <AnimatePresence>
              {showHobbies && (
                <motion.div
                  ref={hobbiesRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full mt-10 flex flex-col items-center"
                >
                  {/* Container with absolutely NO max-width or horizontal margins so it spans edge-to-edge */}
                  <div className="flex flex-col xl:flex-row items-center justify-between mb-0 relative overflow-hidden w-screen left-1/2 -translate-x-1/2">
                    
                    {/* Left Section: HOBBIES Text & Placeholder next to each other */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 pl-[60px] md:pl-[150px] lg:pl-[228px] z-20 w-full xl:w-auto mt-12 xl:mt-0">
                      
                      <motion.h3 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-4xl md:text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tighter leading-none bg-gradient-to-br from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(196,113,237,0.3)] m-0"
                      >
                        HOBBIES
                      </motion.h3>

                      {/* Section 2: 3D Box Placeholder */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="w-full max-w-[260px] md:max-w-[300px] aspect-square rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_0_32px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center relative overflow-hidden group ml-0 lg:ml-8"
                      >
                        {/* Placeholder inner grid / glowing element */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#c471ed]/20 rounded-full blur-[40px] pointer-events-none" />
                        
                        <div className="w-16 h-16 rounded-xl border border-white/20 bg-white/10 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(196,113,237,0.3)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" /></svg>
                        </div>
                        <span className="text-zinc-300 font-medium tracking-widest text-sm uppercase relative z-10 text-center">3D Model Space</span>
                        <span className="text-zinc-500 text-xs mt-2 text-center px-4 relative z-10">Ready for your custom Spline or Three.js scene</span>
                      </motion.div>
                    </div>

                    {/* Right Section: "c|" Semi-Circle Animation perfectly flush to the right edge */}
                    <div className="relative w-full xl:w-1/2 h-[600px] lg:h-[800px] arc-container flex items-center justify-end mt-12 xl:mt-0 z-10" style={{ '--radius': '200px' } as Record<string, string>}>
                      <style>{`
                        @media (min-width: 640px) { .arc-container { --radius: 300px; } }
                        @media (min-width: 1024px) { .arc-container { --radius: 400px; } }
                        @media (min-width: 1536px) { .arc-container { --radius: 450px; } }
                      `}</style>
                      
                      {/* The TRUE solid semi-circle anchored to right edge */}
                      <div className="absolute right-0 top-1/2 w-[var(--radius)] h-[calc(var(--radius)*2)] bg-gradient-to-l from-[#c471ed]/10 to-[#4facfe]/5 border-l border-t border-b border-white/10 backdrop-blur-2xl rounded-l-full -translate-y-1/2 pointer-events-none shadow-[inset_20px_0_40px_rgba(196,113,237,0.05)]" />
                      
                      {hobbiesList.map((hobby, index) => {
                        const isActive = activeIndex === index;
                        // Custom spread to increase spacing at the top/bottom overlap points
                        const angleDeg = [270, 235, 205, 180, 155, 125, 90][index];
                        const angleRad = (angleDeg * Math.PI) / 180;
                        const cos = Math.cos(angleRad);
                        const sin = Math.sin(angleRad);
                        
                        return (
                           <motion.div
                             key={index}
                             className="absolute right-0 top-1/2 flex items-center justify-end gap-4 md:gap-6 -translate-y-1/2 w-[250px] md:w-[350px] lg:w-[450px] z-10"
                             style={{
                                transform: `translate(calc(${cos} * var(--radius)), calc(${sin} * var(--radius)))`,
                             }}
                           >
                             <span className={`text-sm md:text-lg lg:text-xl font-medium text-right leading-tight transition-all duration-500 ${isActive ? 'text-white drop-shadow-[0_0_12px_rgba(196,113,237,0.8)] scale-110 origin-right' : 'text-zinc-500'}`}>
                               {hobby}
                             </span>
                             <div className={`w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 rounded-full flex-shrink-0 transition-all duration-500 border flex items-center justify-center ${isActive ? 'bg-[#c471ed] border-[#c471ed] shadow-[0_0_30px_10px_rgba(196,113,237,0.6)] scale-[1.3] z-20 relative' : 'bg-white/10 border-white/20 opacity-40 z-10'}`}>
                             </div>
                           </motion.div>
                        );
                      })}
                    </div>
                    
                  </div>



              </motion.div>
            )}
          </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
}
