import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from 'motion/react';
import { useRef } from 'react';
import { Atom, BrainCircuit, Database, BarChart3, PenTool } from 'lucide-react';

const PythonIcon = (props: any) => (
  <svg viewBox="0 0 128 128" fill="currentColor" {...props}>
    <path d="M64.75 3.39c-15.01 0-23.23 6.45-23.23 20.31v9.84h23.77v3.39H31.11c-19.14 0-25.07 10.33-25.07 27.28 0 18.06 6.55 26.68 22.02 26.68h6.81v-11.8c0-13.06 10.87-24.08 24.08-24.08h24.7v-25c0-14.73-7.59-26.62-18.9-26.62zm-12.7 8.94c2.51 0 4.54 2.03 4.54 4.54s-2.03 4.54-4.54 4.54-4.54-2.03-4.54-4.54 2.03-4.54 4.54-4.54zm54.34 32.55h-6.8v11.8c0 13.06-10.88 24.08-24.09 24.08H50.81v25c0 14.73 7.59 26.62 18.9 26.62 15.01 0 23.23-6.45 23.23-20.31v-9.84H69.17v-3.39h34.18c19.14 0 25.07-10.33 25.07-27.28 0-18.06-6.55-26.68-22.02-26.68zm-15.54 59.8c-2.51 0-4.54-2.03-4.54-4.54s2.03-4.54 4.54-4.54 4.54 2.03 4.54 4.54-2.03 4.54-4.54 4.54z"/>
  </svg>
);

const leftSkills = [
  { name: 'Python', Icon: PythonIcon, top: '5%', left: '10%', color: '#4facfe', delay: 0 },
  { name: 'React', Icon: Atom, top: '22%', left: '45%', color: '#c471ed', delay: 1 },
  { name: 'Machine Learning', Icon: BrainCircuit, top: '39%', left: '5%', color: '#ff7eb3', delay: 2 },
  { name: 'MongoDB', Icon: Database, top: '56%', left: '45%', color: '#00f2fe', delay: 3 },
  { name: 'Data Visualization', Icon: BarChart3, top: '73%', left: '20%', color: '#fbc2eb', delay: 4 },
  { name: 'UI/UX Designer', Icon: PenTool, top: '90%', left: '40%', color: '#f5576c', delay: 5 }
];

const rightDescriptions = [
  { name: 'Python', top: '5%', left: '15%', color: '#4facfe', desc: 'Proficient in Python for problem-solving, automation, data analysis, and backend development.' },
  { name: 'React', top: '22%', left: '5%', color: '#c471ed', desc: 'Skilled in building responsive and interactive user interfaces using React. Familiar with component-based architecture, state management, and modern frontend development practices.' },
  { name: 'Machine Learning', top: '39%', left: '20%', color: '#ff7eb3', desc: 'Basic understanding of machine learning concepts, model training, and data preprocessing.' },
  { name: 'MongoDB', top: '56%', left: '5%', color: '#00f2fe', desc: 'Knowledgeable in designing and managing NoSQL databases using MongoDB.' },
  { name: 'Data Visualization', top: '73%', left: '15%', color: '#fbc2eb', desc: 'Capable of creating clear and insightful visual representations of data using charts, graphs, and dashboards. Familiar with tools and libraries for analyzing and presenting data effectively.' },
  { name: 'UI/UX Designer', top: '90%', left: '5%', color: '#f5576c', desc: 'Familiar with wireframing, prototyping, responsive design, and modern design principles.' }
];

// Component to handle individual skill highlighting based on scroll progress
function SkillOrb({ skill, scrollYProgress }: { skill: any, scrollYProgress: MotionValue<number> }) {
  const { Icon, top, left, color, delay, name } = skill;
  const topValue = parseFloat(top) / 100;
  
  // Highlight when scroll is near the skill's top percentage (± 15%)
  const range = [Math.max(0, topValue - 0.15), topValue, Math.min(1, topValue + 0.15)];
  
  const scale = useTransform(scrollYProgress, range, [1, 1.25, 1]);
  const shadowIntensity = useTransform(scrollYProgress, range, [10, 30, 10]);
  const textOpacity = useTransform(scrollYProgress, range, [0.6, 1, 0.6]);
  
  // Dynamic shadow using template
  const shadowValue = useMotionTemplate`0 0 ${shadowIntensity}px -5px ${color}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="absolute flex items-center gap-3 z-30"
      style={{ top, left }}
    >
      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ 
          duration: 4 + Math.random() * 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay 
        }}
        className="flex items-center gap-3"
      >
        {/* The Icon Container */}
        <motion.div 
          className="w-16 h-16 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-100"
          style={{ 
            background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))`,
            boxShadow: shadowValue,
            scale
          }}
        >
          <Icon className="w-8 h-8 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
        </motion.div>
        {/* The Text Label */}
        <motion.span 
          className="text-base font-medium tracking-wide text-zinc-300 transition-colors duration-100"
          style={{ textShadow: `0 0 10px ${color}`, opacity: textOpacity }}
        >
          {name}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

function DescriptionCard({ item, scrollYProgress }: { item: any, scrollYProgress: MotionValue<number> }) {
  const { top, left, desc, name, color } = item;
  const topValue = parseFloat(top) / 100;
  
  const range = [Math.max(0, topValue - 0.15), topValue, Math.min(1, topValue + 0.15)];
  
  const opacity = useTransform(scrollYProgress, range, [0.25, 1, 0.25]);
  const xOffset = useTransform(scrollYProgress, range, [15, 0, 15]);
  const scale = useTransform(scrollYProgress, range, [0.95, 1, 0.95]);
  const zIndex = useTransform(scrollYProgress, v => Math.abs(v - topValue) < 0.15 ? 50 : 10);
  
  // Dynamic gradient opacity that peaks when highlighted
  const highlightOpacity = useTransform(scrollYProgress, range, [0, 0.15, 0]);

  return (
    <motion.div
      className="absolute pointer-events-auto w-[85%] md:w-[420px]"
      style={{ top, left, opacity, x: xOffset, scale, zIndex }}
    >
      <div className="flex flex-col gap-2 p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <h4 className="text-white font-semibold tracking-wide relative z-10 text-lg">{name}</h4>
        <p className="text-zinc-400 text-[15px] leading-relaxed relative z-10">{desc}</p>
      </div>
    </motion.div>
  );
}

export default function EducationWalkthrough() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // The trail grows from 0% to 100% of the 1100px height
  const trailHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  // The meteoroid moves down from 0 to 1100px
  const meteorY = useTransform(scrollYProgress, [0, 1], [0, 1100]);
  
  const sparkleOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);

  return (
    <section 
      id="education" 
      className="py-24 max-w-6xl mx-auto relative z-10 w-full min-h-[100vh]" 
    >
      {/* Unique Cosmic Section Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl flex items-center justify-center opacity-70">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-[#c471ed]/50"></div>
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_3px_rgba(196,113,237,0.8)] mx-2"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent via-white/5 to-[#c471ed]/50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-24 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight inline-block relative bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(196,113,237,0.4)]">
          Technical Proficiencies
        </h2>
      </motion.div>

      {/* The Scroll Container for the animation. Height increased to 1100px for text space */}
      <div 
        ref={containerRef} 
        className="relative h-[1100px] w-full max-w-4xl mx-auto mb-32 flex justify-center"
      >
        {/* Faint background track */}
        <div className="absolute top-0 h-[1100px] left-1/2 -translate-x-1/2 w-[2px] bg-white/5 rounded-full z-0"></div>
        
        {/* The purple gradient trail left behind */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[4px] bg-gradient-to-b from-transparent via-[#c471ed] to-[#3a015c] rounded-full origin-top z-10"
          style={{ height: trailHeight, boxShadow: '0 0 15px 2px rgba(196,113,237,0.5)' }}
        ></motion.div>

        {/* The Meteoroid head mapping to Y translation */}
        <motion.div 
          className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center -ml-[1px]"
          style={{ y: meteorY }}
        >
          <div className="w-5 h-5 rounded-full bg-white shadow-[0_0_25px_10px_rgba(196,113,237,0.9)] border-2 border-[#c471ed]" />
        </motion.div>

        {/* Curvy Sparkling at the end of the 1100px track */}
        <motion.div 
          className="absolute top-[1100px] left-1/2 -translate-x-1/2 z-10 flex items-center justify-center -mt-3"
          style={{ opacity: sparkleOpacity }}
        >
          {/* Rotating curvy sparkles */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-28 h-28 text-[#c471ed] opacity-80"
            viewBox="0 0 100 100"
          >
            {/* Curvy star shape */}
            <path 
              d="M50,10 C60,40 90,50 90,50 C90,50 60,60 50,90 C40,60 10,50 10,50 C10,50 40,40 50,10 Z" 
              fill="url(#sparkleGrad)" 
              stroke="rgba(196,113,237,0.8)" 
              strokeWidth="1" 
            />
            {/* Dashed outer curved ring */}
            <circle cx="50" cy="50" r="35" fill="none" stroke="#4facfe" strokeWidth="1" strokeDasharray="4 8" />
            <defs>
              <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#c471ed" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="transparent" stopOpacity="0"/>
              </radialGradient>
            </defs>
          </motion.svg>
          
          {/* Inner pulsating star */}
          <motion.div
             animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
             className="w-5 h-5 bg-white rounded-full shadow-[0_0_20px_10px_rgba(79,172,254,0.9)] z-30"
          />
        </motion.div>

        {/* Left and Right Components alongside the track */}
        <div className="absolute inset-0 flex pointer-events-none">
          
          {/* Left item container for floating skills */}
          <div className="w-1/2 pr-16 relative pointer-events-auto h-full">
            {leftSkills.map((skill, index) => (
              <SkillOrb key={index} skill={skill} scrollYProgress={scrollYProgress} />
            ))}
          </div>

          {/* Right item container for descriptions */}
          <div className="w-1/2 relative h-full pl-8 md:pl-16">
            {rightDescriptions.map((desc, index) => (
              <DescriptionCard key={index} item={desc} scrollYProgress={scrollYProgress} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
