import { motion } from 'motion/react';

const projects = [
  {
    title: 'E-commerce Platform',
    role: 'Full Stack Development',
    category: 'Application / 2024',
    live: '#',
  },
  {
    title: 'Task Management App',
    role: 'Frontend & UX',
    category: 'Product / 2023',
    live: '#',
  },
  {
    title: 'Weather Dashboard',
    role: 'Web Application',
    category: 'Interface / 2023',
    live: '#',
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto relative z-10 w-full">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            The <span className="bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(196,113,237,0.4)]">work</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-[#4facfe]/50 via-[#c471ed]/50 to-transparent flex-grow max-w-sm hidden md:block"></div>
        </div>
      </motion.div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        style={{ scrollBehavior: 'smooth' }}
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer flex flex-col relative"
          >
            {/* Ambient glow behind card that brightens on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4facfe] to-[#c471ed] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500" />
            
            <a 
              href={project.live} 
              className="flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-3 p-3 relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(24px) saturate(150%)',
                WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div className="aspect-[4/3] bg-black/30 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center border border-white/5">
                {/* Image placeholder bottom shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 z-10"></div>
                
                {/* Gradient hover overlay (blue to purple) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/50 via-[#c471ed]/50 to-[#3a015c]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/30 via-[#c471ed]/30 to-[#3a015c]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

                <span className="text-[10px] uppercase tracking-widest text-zinc-400 relative z-20 group-hover:text-white transition-colors duration-300 drop-shadow-md">
                  {project.category}
                </span>
              </div>
              <div className="px-3 pb-3 flex flex-col flex-grow relative z-20">
                <h3 className="text-xl font-semibold text-zinc-100 group-hover:bg-gradient-to-r group-hover:from-[#4facfe] group-hover:to-[#c471ed] group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 w-fit">{project.title}</h3>
                <p className="text-sm text-zinc-400 mt-2 font-light">
                  {project.role}
                </p>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
