import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Model3D from './Model3D';
import Education from './Education';

// Placeholder — replace with actual bio later
const ABOUT_TEXT =
  "Driven, ambitious, and highly improvement-focused, with a strong tendency to aim beyond average standards and constantly seek higher levels of growth. Naturally curious and proactive in exploring new ideas, especially in areas involving innovation, creativity, and impactful problem-solving. Shows a combination of technical thinking and practical execution, with the ability to quickly learn, adapt, and independently build solutions from ideas. \n\nPossesses a competitive mindset balanced with collaboration and leadership qualities, often taking initiative in team environments and community activities. Strong attention toward self-development, presentation, and personal branding reflects confidence, determination, and a desire to stand out. Maintains persistence under pressure, values consistency and discipline, and approaches goals with a future-oriented mindset and high aspirations for success.";

const hobbiesList = [
  "Listening to Music",
  "Sketching/digital art",
  "Travelling and Exploring",
  "WEB development",
  "Fitness & Walking",
  "Exploring Tech",
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
    }, 4000);
    return () => clearInterval(interval);
  }, [showHobbies]);

  const handleShowHobbies = () => {
    setShowHobbies(true);
    setTimeout(() => {
      hobbiesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  const handleClose = () => {
    setShowHobbies(false);
    // Use window.scrollTo to ensure we get back to the right vertical position
    const topOffset = sectionRef.current?.offsetTop || 0;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
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
                      <div className="relative group">
                        {/* Sparkles around button */}
                        <div className="absolute -inset-10 pointer-events-none">
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 0.8, 0],
                                rotate: [0, 90, 180],
                              }}
                              transition={{
                                duration: 2.5 + Math.random(),
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                              }}
                              className="absolute w-4 h-4 text-blue-400/60"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                              }}
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="blur-[0.5px]">
                                <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
                              </svg>
                            </motion.div>
                          ))}
                        </div>

                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowHobbies();
                          }}
                          className="group relative text-sm md:text-base font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer px-4"
                        >
                          Know more about me
                          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#4facfe] to-[#c471ed] origin-left transition-transform group-hover:scale-x-105"></span>
                        </button>
                      </div>
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
                <>
                  {/* Fixed Close Button Card */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleClose}
                    className="fixed top-8 right-8 z-[100] px-6 py-3 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl text-white font-mono text-[10px] uppercase tracking-[0.4em] hover:bg-white/10 hover:border-white/20 transition-all shadow-2xl flex items-center gap-3 group"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444] group-hover:animate-pulse" />
                    Close
                  </motion.button>

                  <motion.div
                  ref={hobbiesRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full mt-10 flex flex-col items-center"
                >
                  {/* Centered HOBBIES Section */}
                  <div className="relative flex flex-col items-center justify-center w-full mt-20 mb-40">
                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-0">
                      {/* HOBBIES Text */}
                      <motion.h3 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] xl:text-[14rem] font-black tracking-tighter leading-none bg-gradient-to-br from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(196,113,237,0.35)] m-0 relative z-10 select-none"
                      >
                        HOBBIES
                      </motion.h3>

                      {/* 3D Model leaning against "s" */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.6, x: 50, y: 50, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                        transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-[180px] sm:w-[240px] md:w-[420px] lg:w-[520px] aspect-square z-20 pointer-events-none md:-ml-20 lg:-ml-32 md:translate-y-12"
                      >
                        {/* Ambient glow orbs behind the model */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-[#c471ed]/15 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[400px] max-h-[400px] bg-[#4facfe]/10 rounded-full blur-[100px] pointer-events-none" />
                        
                        <Model3D />
                      </motion.div>
                    </div>

                    {/* Neural Network Hobby Graph */}
                    <div className="relative mt-24 md:mt-32 w-full max-w-[95vw] h-[500px] md:h-[800px] flex items-center justify-center left-1/2 -translate-x-1/2 overflow-visible">
                      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        <defs>
                          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4facfe" stopOpacity="0.15" />
                            <stop offset="50%" stopColor="#c471ed" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#4facfe" stopOpacity="0.15" />
                          </linearGradient>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                              <feMergeNode in="coloredBlur" />
                              <feMergeNode in="SourceGraphic" />
                            </feMerge>
                          </filter>
                          {/* Spark Gradient */}
                          <radialGradient id="sparkGrad">
                            <stop offset="0%" stopColor="#fff" />
                            <stop offset="100%" stopColor="#4facfe" stopOpacity="0" />
                          </radialGradient>
                        </defs>

                        {/* Connection Lines (Neural Style) */}
                        {[
                          [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0], // Linear Sequence Cycle
                          [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 0] // Additional Neural Links
                        ].map(([a, b], i) => {
                          const nodes = [
                            { x: 25, y: 30 }, { x: 65, y: 85 }, { x: 50, y: 15 }, 
                            { x: 90, y: 60 }, { x: 80, y: 25 }, { x: 35, y: 70 }, { x: 8, y: 50 }
                          ];
                          const posA = nodes[a];
                          const posB = nodes[b];
                          
                          return (
                            <line
                              key={`edge-${i}`}
                              x1={`${posA.x}%`}
                              y1={`${posA.y}%`}
                              x2={`${posB.x}%`}
                              y2={`${posB.y}%`}
                              stroke="url(#lineGrad)"
                              strokeWidth="1.5"
                              filter="url(#glow)"
                            />
                          );
                        })}

                        {/* Traveling Spark along the linear sequence [0, 1, 2, 3, 4, 5, 6] */}
                        {(() => {
                          const nextNodeIdx = (activeIndex + 1) % hobbiesList.length;
                          const nodes = [
                            { x: 25, y: 30 }, { x: 65, y: 85 }, { x: 50, y: 15 }, 
                            { x: 90, y: 60 }, { x: 80, y: 25 }, { x: 35, y: 70 }, { x: 8, y: 50 }
                          ];
                          
                          return (
                            <motion.circle
                              r="5"
                              fill="url(#sparkGrad)"
                              filter="url(#glow)"
                              key={`spark-${activeIndex}`}
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: [0, 1, 1, 0],
                                cx: [`${nodes[activeIndex].x}%`, `${nodes[nextNodeIdx].x}%`],
                                cy: [`${nodes[activeIndex].y}%`, `${nodes[nextNodeIdx].y}%`]
                              }}
                              transition={{
                                duration: 1.5, 
                                ease: "easeInOut"
                              }}
                            />
                          );
                        })()}
                      </svg>

                      {/* Hobby Nodes (Stars) */}
                      {[
                        { x: 25, y: 30 }, { x: 65, y: 85 }, { x: 50, y: 15 }, 
                        { x: 90, y: 60 }, { x: 80, y: 25 }, { x: 35, y: 70 }, { x: 8, y: 50 }
                      ].map((pos, index) => {
                        const isActive = activeIndex === index;
                        const hobby = hobbiesList[index];

                        return (
                          <motion.div
                            key={index}
                            className="absolute flex flex-col items-center justify-center"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
                          >
                            {/* Node Glow (Only when active) */}
                            <AnimatePresence>
                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 2, opacity: 0.5 }}
                                  exit={{ scale: 2.5, opacity: 0 }}
                                  className="absolute w-20 h-20 rounded-full bg-[#c471ed] blur-[30px] pointer-events-none"
                                />
                              )}
                            </AnimatePresence>

                            {/* The Node Star */}
                            <motion.div
                              animate={{ 
                                scale: isActive ? 1.8 : 1,
                                background: isActive 
                                  ? 'linear-gradient(135deg, #4facfe 0%, #c471ed 100%)' 
                                  : 'rgba(255,255,255,0.4)',
                                boxShadow: isActive ? '0 0 30px rgba(196,113,237,0.9)' : '0 0 10px rgba(255,255,255,0.1)'
                              }}
                              className={`w-4 h-4 rounded-full border border-white/30 z-30 transition-all duration-500`}
                            />

                            {/* Hobby Text */}
                            <motion.span
                              animate={{ 
                                scale: isActive ? 1.25 : 1,
                                color: isActive ? '#fff' : 'rgba(255,255,255,0.6)',
                                textShadow: isActive ? '0 0 15px rgba(79,172,254,1)' : 'none'
                              }}
                              className="whitespace-nowrap text-xs md:text-sm font-bold tracking-widest uppercase mt-6 pointer-events-none z-40 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                            >
                              {hobby}
                            </motion.span>

                            {/* Sparkles around active star */}
                            {isActive && [1, 2, 3].map((s) => (
                              <motion.div
                                key={`sparkle-${index}-${s}`}
                                animate={{ 
                                  opacity: [0, 1, 0], 
                                  scale: [0, 1.5, 0],
                                  x: (Math.sin(s) * 60),
                                  y: (Math.cos(s) * 60),
                                }}
                                transition={{ duration: 1, repeat: Infinity, delay: s * 0.2 }}
                                className="absolute text-blue-300 w-5 h-5"
                              >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
                                </svg>
                              </motion.div>
                            ))}
                          </motion.div>
                        );
                      })}

                      {/* Ambient Background Sparkles */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(25)].map((_, i) => (
                          <motion.div
                            key={`bg-sparkle-${i}`}
                            animate={{
                              opacity: [0.1, 0.4, 0.1],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 4,
                              repeat: Infinity,
                              delay: Math.random() * 5
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Education Section — Right below Hobbies */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="w-full"
                  >
                    <Education />
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
      </div>
    </section>
  );
}
