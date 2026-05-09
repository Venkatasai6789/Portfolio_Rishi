import { motion } from 'motion/react';
import { GraduationCap, School, BookOpen } from 'lucide-react';

const educationData = [
  { 
    level: '10th Standard', 
    institution: 'School Name', 
    year: '20XX - 20XX',
    desc: 'Completed Secondary Education with focus on Science and Mathematics.',
    icon: School,
    color: '#4facfe'
  },
  { 
    level: '12th / Intermediate', 
    institution: 'College Name', 
    year: '20XX - 20XX',
    desc: 'Specialized in MPC/Science Stream with high academic excellence.',
    icon: BookOpen,
    color: '#c471ed'
  },
  { 
    level: 'B.Tech (CSE)', 
    institution: 'University Name', 
    year: '20XX - Present',
    desc: 'Pursuing Bachelor of Technology in Computer Science & Engineering.',
    icon: GraduationCap,
    color: '#3a015c'
  },
];

export default function Education() {
  return (
    <section id="education" className="pt-0 pb-20 relative z-10 w-full overflow-hidden">
      {/* Gradient Left-Aligned Title */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-left"
      >
        <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text tracking-tighter uppercase leading-none">
          Education
        </h2>
        <div className="mt-4 w-24 h-1.5 bg-gradient-to-r from-[#4facfe] to-[#c471ed] rounded-full"></div>
      </motion.div>

      {/* Horizontal Scrollable Roadmap */}
      <div className="relative overflow-x-auto no-scrollbar pb-20 pt-32 cursor-grab active:cursor-grabbing">
        <div className="relative min-w-[1600px] h-[500px]">
          
      {/* 3D Horizontal Roadmap Scene */}
      <div className="relative overflow-x-auto no-scrollbar pb-32 pt-56 cursor-grab active:cursor-grabbing" style={{ perspective: '2500px' }}>
        <div className="relative min-w-[3600px] h-[700px] flex items-center justify-start px-[10vw]">
          
          {/* Tilted 3D Floor/Path Container */}
          <div 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'rotateX(60deg) translateY(100px)',
            }}
          >
            {/* The 3D Roadmap Line (CSS Div) */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: '3400px', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
              className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] rounded-full"
              style={{
                boxShadow: '0 0 30px rgba(196,113,237,0.6), 0 0 60px rgba(79,172,254,0.3)',
                transform: 'translateY(-50%)',
              }}
            >
              {/* Checkpoints along the line */}
              {educationData.map((item, index) => {
                const xPos = index * 1200 + 300;
                return (
                  <motion.div
                    key={`node-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.8 + index * 0.3, type: "spring" }}
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{ left: `${xPos}px` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-black border-4 border-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                       <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Floating Cards (Positioned above the tilted path) */}
          <div className="relative flex">
            {educationData.map((item, index) => {
              const Icon = item.icon;
              const xPos = index * 1200 + 300;
              
              return (
                <div 
                  key={index} 
                  className="absolute" 
                  style={{ 
                    left: `${xPos}px`, 
                    top: '-100px',
                    transform: 'translateX(-50%)'
                  }}
                >
                  {/* 3D Card with counter-rotation to face user */}
                  <motion.div
                    initial={{ opacity: 0, y: 100, rotateX: 20 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.2, 
                      delay: 2.5 + index * 0.4, // Appears AFTER line and nodes
                      ease: [0.22, 1, 0.36, 1] 
                    }}
                    style={{ perspective: '1200px' }}
                  >
                    {/* Floating Animation Wrapper */}
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: index * 0.5 
                      }}
                      className="w-[380px] p-8 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-2xl hover:bg-white/10 transition-all duration-500 group relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)]"
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Glow Effects */}
                      <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#4facfe]/20 rounded-full blur-[80px] group-hover:bg-[#4facfe]/30 transition-colors"></div>
                      
                      <div className="relative z-10" style={{ transform: 'translateZ(60px)' }}>
                        <div className="flex items-center justify-between mb-8">
                          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#4facfe] to-[#c471ed] text-white shadow-xl shadow-purple-500/30">
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="px-5 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-lg">
                            <span className="text-xs font-mono font-black tracking-[0.3em] text-white/80">
                              {item.year}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-[#4facfe] transition-colors leading-none">
                          {item.level}
                        </h3>
                        <h4 className="text-xl font-bold text-zinc-400 mb-6 italic">
                          {item.institution}
                        </h4>
                        
                        <p className="text-base text-zinc-300 font-light leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Animated bottom bar */}
                      <div className="absolute bottom-0 left-0 w-0 h-2 bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] group-hover:w-full transition-all duration-1000 ease-out"></div>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


        </div>
      </div>

      <style>{`
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
