import { motion } from 'motion/react';
import { MapPin, Code2, Send, Github, Linkedin, Instagram, Download } from 'lucide-react';

const skills = [
  "AI Enthusiast",
  "Full Stack developer",
  "React Specialist",
  "Analyst",
  "Mongo DB"
];

// Helper to split text for character animations
const animatedText = "Full Stack Developer | Machine learning";

export default function Hero({ ready = false }: { ready?: boolean }) {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center pt-24 mb-20 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative">
        {/* Left side content */}
        <div className="lg:col-span-7 z-10 w-full flex flex-col lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-2xl"
          >
            <h2 className="text-2xl md:text-3xl font-light text-zinc-300 mb-2">
              Hi! I'm
            </h2>
            <div className="relative inline-block mb-4 mt-1 w-full">
              {/* Sparkle Stars */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 1, 0.3], rotate: [0, 90, 180] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 text-blue-300 w-5 h-5 hidden md:block"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" fill="currentColor"/>
                </svg>
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5], rotate: [0, -90, -180] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 right-0 md:-right-4 text-purple-300 w-7 h-7"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L13.2 7.8L21 9L13.2 10.2L12 18L10.8 10.2L3 9L10.8 7.8L12 0Z" fill="currentColor"/>
                </svg>
              </motion.div>
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-2 right-1/4 text-blue-400 w-3 h-3"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L12.8 8.2L21 9L12.8 9.8L12 18L11.2 9.8L3 9L11.2 8.2L12 0Z" fill="currentColor"/>
                </svg>
              </motion.div>
              
              <h1 className="text-[clamp(1.5rem,3.5vw,3rem)] lg:text-[3.2rem] whitespace-nowrap font-bold tracking-tight bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text uppercase leading-tight drop-shadow-[0_0_15px_rgba(196,113,237,0.4)] relative z-10 w-fit">
                RISHITHA TEDLAPALLI
              </h1>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 24, filter: 'blur(6px)' }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl text-zinc-200 font-medium mb-6 flex flex-wrap max-w-2xl"
            >
              {animatedText.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex overflow-hidden mr-2 mb-1">
                  {word.split("").map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                      animate={ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(4px)' }}
                      transition={{
                        delay: 0.4 + (wordIndex * 6 + charIndex) * 0.038,
                        duration: 0.5,
                        ease: 'easeOut',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, filter: "blur(5px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-sm md:text-base text-zinc-400 font-light max-w-2xl leading-relaxed mb-8"
            >
              Creating AI-powered solutions. Building modern web experiences. Solving real-world problems with technology.
            </motion.p>

            {/* Floating Glass Pills */}
            <div className="flex flex-wrap gap-4 mb-14 max-w-2xl">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -6, 0],
                  }}
                  transition={{ 
                    opacity: { delay: 1.8 + index * 0.1 },
                    scale: { delay: 1.8 + index * 0.1 },
                    y: { 
                      duration: 3 + Math.random() * 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }
                  }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.6)", backgroundColor: "rgba(255,255,255,0.15)" }}
                  className="px-5 py-2.5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-[13px] font-medium text-white cursor-default transition-all duration-300"
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Floating Glass Info Cards - Space theme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl xl:max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ 
                  opacity: { delay: 2.2, duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0 }
                }}
                className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 mb-4 text-purple-400 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-purple-100">Location</span>
                </div>
                <p className="text-white text-sm font-light relative z-10">Tirupati, Andhra pradesh, India</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{ 
                  opacity: { delay: 2.4, duration: 0.5 },
                  y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 mb-4 text-blue-400 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] transition-all">
                  <Code2 className="w-5 h-5" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-blue-100">Expertise</span>
                </div>
                <p className="text-white text-sm font-light leading-relaxed relative z-10">full stack development, problem solving</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -12, 0] }}
                transition={{ 
                  opacity: { delay: 2.6, duration: 0.5 },
                  y: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="p-6 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 mb-4 text-rose-400 group-hover:drop-shadow-[0_0_8px_rgba(244,63,94,0.8)] transition-all">
                  <Send className="w-5 h-5" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-rose-100">Contact</span>
                </div>
                <a href="mailto:tedlapallirishitha@gmail.com" className="text-white text-[13px] font-light break-all hover:text-white transition-colors relative z-10 mt-auto">
                  tedlapallirishitha@gmail.com
                </a>
              </motion.div>
            </div>

            {/* Social Links below Bento Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 max-w-3xl mt-8"
            >
              <a href="https://github.com/Rishitha7272" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 hover:border-purple-500/50 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
                <Github className="w-5 h-5 text-white group-hover:text-purple-400 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/rishitha-tedlapalli-558480307/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 hover:border-blue-500/50 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
                <Linkedin className="w-5 h-5 text-white group-hover:text-blue-400 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/rishiii_tedlapalli/" target="_blank" rel="noopener noreferrer" className="p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 hover:border-pink-500/50 transition-all duration-300 group shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
                <Instagram className="w-5 h-5 text-white group-hover:text-pink-400 group-hover:scale-110 transition-transform" />
              </a>
              {/* Download Resume Button */}
              <a href="/resume.pdf" download className="flex items-center gap-2 px-6 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-[#4facfe] to-[#c471ed] text-white font-medium hover:opacity-90 transition-all duration-300 shadow-[0_8px_32px_0_rgba(196,113,237,0.4)] hover:shadow-[0_8px_32px_0_rgba(79,172,254,0.6)] group relative overflow-hidden">
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
                <span className="text-[13px] sm:text-sm whitespace-nowrap relative z-10">Download Resume</span>
                <Download className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:scale-110 transition-all relative z-10" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side portrait area */}
        <div className="lg:col-span-5 relative mt-20 lg:mt-0 flex justify-end lg:justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-[4/5] max-w-md xl:max-w-lg"
          >
            {/* Ambient glows behind image */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-navy/60 rounded-full blur-[80px]"></div>
            
            {/* Placeholder for portrait */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-zinc-800/50 bg-[#05101f] flex flex-col items-center justify-center p-8 group">
               <div className="w-32 h-32 rounded-full border border-zinc-800 mb-6 flex items-center justify-center bg-zinc-900 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-zinc-600">Photo</span>
               </div>
               <p className="text-zinc-400 text-sm text-center max-w-[200px] leading-relaxed">
                 Replace this block with your portrait image.
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
