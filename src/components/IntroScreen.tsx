import { motion } from 'motion/react';
import { useEffect } from 'react';

export default function IntroScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  useEffect(() => {
    // Lock scroll on the body while the intro is active
    document.body.style.overflow = 'hidden';
    
    // Total duration of the intro sequence before resolving
    const timer = setTimeout(() => {
      onComplete();
    }, 2800); 

    return () => {
      document.body.style.overflow = 'visible';
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-brand-purple/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col items-center relative z-10">
        {/* Animated Logo Box */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-24 h-24 rounded-3xl bg-[#ffffff05] border border-[#ffffff10] backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(58,1,92,0.6)] mb-8 overflow-hidden group"
        >
          {/* Sweeping light effect inside the logo */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-purple-400/20 to-transparent skew-x-[-20deg]"
          />
          <span className="font-bold text-4xl font-mono tracking-tighter text-purple-400">RT</span>
        </motion.div>

        {/* Name Reveal */}
        <div className="overflow-hidden mb-6">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl tracking-[0.4em] text-zinc-200 font-light uppercase ml-2 text-center"
          >
            Rishitha Tedlapalli
          </motion.div>
        </div>
        
        {/* Underline expanding animation */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeInOut" }}
          className="h-px w-48 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent origin-center"
        />

        {/* Initializing Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8 text-zinc-500 text-[10px] font-mono tracking-widest uppercase flex flex-col items-center gap-2"
        >
          <div className="flex gap-1">
            <span className="animate-pulse">Loading Experience</span>
            <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
            <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
            <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>.</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
