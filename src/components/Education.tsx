import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';

const educationData = [
  { 
    id: 0, 
    title: '🏫 10th Grade', 
    year: '2022', 
    details: [
      'Oxford Public School',
      '📍 Sri Kalahasti, Andhra Pradesh',
      '📊 Percentage: 95%'
    ],
    x: 600, y: 625, scale: 1.2
  },
  { 
    id: 1, 
    title: '🎓 12th Grade', 
    year: '2022 - 2024', 
    details: [
      'Narayana Junior College',
      '📍 Tirupati, Andhra Pradesh',
      '📊 Percentage: 96.7%'
    ],
    x: 1800, y: 475, scale: 1.0
  },
  { 
    id: 2, 
    title: '🚀 B.Tech', 
    year: '2024 - Present', 
    details: [
      'Artificial Intelligence and Data Science',
      '🏛️ Kalasalingam Academy of Research and Education',
      '📍 Krishnankoil, Tamil Nadu',
      '📊 CGPA: 9.8'
    ],
    x: 3000, y: 325, scale: 0.8
  },
  { 
    id: 3, 
    title: '🏆 Awards & Achievements', 
    year: '2024 - 2026', 
    awards: [
      { 
        title: 'Innovatron Hackathon', 
        year: '2026',
        desc: 'Won in Karunya University by developing an innovative solution under time-constrained team problem solving.',
        link: '/WhatsApp Image 2026-05-14 at 16.39.57.jpeg'
      },
      { 
        title: 'Academic Award 2025', 
        year: '2025',
        desc: 'Recognition for academic excellence in year 2025.',
        link: '/WhatsApp Image 2026-05-14 at 16.39.56.jpeg'
      },
      { 
        title: 'Academic Award 2026', 
        year: '2026',
        desc: 'Recognition for academic excellence in year 2026.',
        link: '/222.jpeg'
      }
    ],
    x: 4200, y: 175, scale: 0.6
  },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[100vh] w-full py-32 overflow-hidden bg-black flex flex-col items-center">
      {/* Background Star Field */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2 + Math.random() * 4, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 text-center mb-20 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text tracking-tighter uppercase leading-none">
          Academic Odyssey
        </h2>
        <p className="mt-4 text-zinc-500 font-mono tracking-widest text-xs uppercase">
          Slide to explore the timeline
        </p>
      </motion.div>

      {/* Outer container — full screen width, horizontal scroll */}
      <div 
        ref={scrollRef}
        className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide select-none touch-pan-x pb-20"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* The Timeline Track — 4800px long */}
        <div className="relative w-[4800px] h-[800px]">
          
          {/* SVG Energy Trail - Nebula Fog Version */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <linearGradient id="nebulaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="40%" stopColor="#c471ed" />
                <stop offset="70%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              
              <filter id="nebulaBlur">
                <feGaussianBlur stdDeviation="15" result="blur1" />
              </filter>
              <filter id="nebulaBlurLarge">
                <feGaussianBlur stdDeviation="40" result="blur2" />
              </filter>
            </defs>

            {/* Deep Ambient Nebula Fog (Layer 1) */}
            <motion.path
              d="M 0 700 L 4800 100"
              stroke="url(#nebulaGrad)"
              strokeWidth="120"
              strokeLinecap="round"
              className="opacity-20"
              filter="url(#nebulaBlurLarge)"
            />

            {/* Core Nebula Glow (Layer 2) */}
            <motion.path
              d="M 0 700 L 4800 100"
              stroke="url(#nebulaGrad)"
              strokeWidth="40"
              strokeLinecap="round"
              className="opacity-20"
              filter="url(#nebulaBlur)"
            />

            {/* Soft Energy Core (Layer 3) */}
            <motion.path
              d="M 0 700 L 4800 100"
              fill="none"
              stroke="url(#nebulaGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-40"
              filter="url(#nebulaBlur)"
            />
          </svg>

          {/* Checkpoints as Glass Cards */}
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.2, duration: 1 }}
              className="absolute group"
              style={{ 
                left: `${item.x}px`, 
                top: `${item.y - 20}px`, 
                transform: `translate(-50%, -100%)`, 
                zIndex: 20
              }}
            >
              {/* Glass Card */}
              <motion.div 
                whileHover={{ 
                  y: -15, 
                  scale: 1.05,
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
                className="p-8 rounded-3xl border border-white/5 bg-transparent backdrop-blur-0 group-hover:backdrop-blur-2xl shadow-none group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] min-w-[340px] max-w-[450px] relative overflow-hidden transition-all duration-700 ease-out"
              >
                {/* Multi-color Midnight/Purple Glow on Hover */}
                <div className="absolute inset-0 p-[1.5px] rounded-3xl bg-gradient-to-r from-[#4facfe] to-[#c471ed] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="absolute inset-[1.5px] rounded-3xl bg-[#020617]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Subtle top glow */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c471ed]/40 to-transparent" />
                
                <h4 className="text-white text-2xl md:text-3xl font-black tracking-tight leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#4facfe] group-hover:to-[#c471ed] transition-all">
                  {item.title}
                </h4>
                
                <div className="flex items-center justify-between mt-4 mb-6">
                  <span className="text-[#c471ed] text-sm font-mono tracking-widest uppercase font-bold">
                    {item.year}
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-[#4facfe] to-[#c471ed] rounded-full" />
                </div>

                {/* Multi-line Details */}
                {item.details && (
                  <div className="space-y-2 mb-4">
                    {item.details.map((detail, idx) => (
                      <p key={idx} className="text-slate-300 text-sm font-medium leading-relaxed">
                        {detail}
                      </p>
                    ))}
                  </div>
                )}

                {/* Awards List Layout */}
                {item.awards && (
                  <div className="space-y-6 mt-4">
                    {item.awards.map((award, idx) => (
                      <div key={idx} className="relative pl-6 border-l border-[#c471ed]/30">
                        <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#c471ed] shadow-[0_0_8px_#c471ed]" />
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="text-white text-base font-bold tracking-tight">
                            {award.title}
                          </h5>
                          {award.link && (
                            <a 
                              href={award.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[10px] font-mono text-[#4facfe] uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
                            >
                              View 👁️
                            </a>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs font-light leading-relaxed italic">
                          {award.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Animated midnight/purple bottom shimmer */}
                <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-[#4facfe] to-[#c471ed] group-hover:w-full transition-all duration-1000" />
              </motion.div>

              {/* Connecting Beam (Floating look) */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-5 bg-gradient-to-t from-purple-500/50 to-transparent translate-y-full" />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .bg-clip-text {
          -webkit-background-clip: text;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
