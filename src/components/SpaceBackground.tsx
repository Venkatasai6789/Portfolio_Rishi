import { motion } from 'motion/react';
import { useMemo } from 'react';

export default function SpaceBackground() {
  // Generate random stars only once
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 0.5,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 7,
      color: Math.random() > 0.8 ? '#bae6fd' : '#ffffff', // Some blue-ish stars
    }));
  }, []);

  return (
    <div className="stars-container">
      {/* Deep Space Gradients (Nebulae) */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 20, 0],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none"
      />
      
      {/* Extra Blue Glows for "Space Blue" feel */}
      <div className="absolute top-1/4 right-1/4 w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      {/* Star Field */}
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              width: star.size,
              height: star.size,
              top: star.top,
              left: star.left,
              backgroundColor: star.color,
              boxShadow: star.size > 2 ? `0 0 10px ${star.color}` : 'none',
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Subtle Noise / Grain for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] brightness-100 contrast-150 pointer-events-none mix-blend-overlay" />
    </div>
  );
}
