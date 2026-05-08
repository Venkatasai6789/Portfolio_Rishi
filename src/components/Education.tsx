import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const educationData = [
  { level: '10th', institution: 'Your School Name', year: 'Year of Completion' },
  { level: '12th', institution: 'Your College Name', year: 'Year of Completion' },
  { level: 'Engineering', institution: 'Your University Name', year: 'Year of Completion' },
];

export default function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="education" className="py-24 max-w-6xl mx-auto relative z-10 w-full" ref={containerRef}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight inline-block relative">
          Education
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#c471ed] rounded-full blur-[2px]"></div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full"></div>
        </h2>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Cosmic Line background (faint) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full"></div>
        
        {/* Cosmic Line foreground (glowing purple, animates with scroll) */}
        <motion.div 
          className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#c471ed] via-[#4facfe] to-[#3a015c] -translate-x-1/2 rounded-full origin-top"
          style={{ 
            scaleY: lineHeight,
            boxShadow: '0 0 15px 2px rgba(196,113,237,0.5)'
          }}
        ></motion.div>

        <div className="flex flex-col gap-24 relative z-10 py-10">
          {educationData.map((item, index) => {
            return (
              <div key={index} className="flex items-center w-full relative group">
                {/* Left side (Education Level) */}
                <div className="w-1/2 pr-8 md:pr-12 text-right flex justify-end">
                  <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#4facfe] to-[#c471ed] text-transparent bg-clip-text drop-shadow-sm group-hover:drop-shadow-[0_0_10px_rgba(196,113,237,0.5)] transition-all duration-300">
                      {item.level}
                    </h3>
                  </motion.div>
                </div>

                {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.4, type: "spring", delay: 0.2 }}
                    className="w-5 h-5 rounded-full bg-brand-black border-2 border-[#4facfe] relative z-20 group-hover:scale-125 group-hover:border-[#c471ed] transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(196,113,237,0.8)'
                    }}
                  >
                    <div className="absolute inset-1 bg-gradient-to-br from-[#4facfe] to-[#c471ed] rounded-full"></div>
                  </motion.div>
                </div>

                {/* Right side (Institution & Year) */}
                <div className="w-1/2 pl-8 md:pl-12 text-left flex justify-start">
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col p-6 rounded-2xl relative overflow-hidden group-hover:-translate-y-1 transition-transform duration-300 w-full max-w-sm"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: '0 4px 30px rgba(0,0,0,0.1)',
                    }}
                  >
                    {/* Hover gradient background effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/10 to-[#c471ed]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <h4 className="text-xl md:text-2xl font-semibold text-zinc-100 relative z-10">{item.institution}</h4>
                    <div className="mt-3 inline-flex items-center gap-2 relative z-10">
                      <span className="w-2 h-2 rounded-full bg-[#c471ed] shadow-[0_0_8px_#c471ed]"></span>
                      <span className="text-sm font-mono tracking-wider text-zinc-300">{item.year}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
