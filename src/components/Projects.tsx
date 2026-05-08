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
  },
  {
    title: 'Personal Blog Theme',
    role: 'Static Site Generator',
    category: 'Template / 2022',
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
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">Featured Projects</h2>
          <div className="h-[1px] bg-zinc-800 flex-grow max-w-sm hidden md:block"></div>
        </div>
        <p className="text-zinc-400 font-light max-w-xl">A selection of recent work and side projects focusing on modern web experiences.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group cursor-pointer flex flex-col"
          >
            <a href={project.live} className="flex flex-col h-full rounded-2xl bg-brand-midnight/40 border border-zinc-800/80 overflow-hidden hover:border-purple-500/50 transition-colors backdrop-blur-sm p-2">
              <div className="aspect-[4/3] bg-[#030b17] rounded-xl mb-6 relative overflow-hidden flex items-center justify-center">
                {/* Image placeholder / Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030b17] to-transparent opacity-60 z-10"></div>
                <div className="absolute inset-0 bg-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <span className="text-[10px] uppercase tracking-widest text-zinc-600 relative z-20 group-hover:text-purple-400 transition-colors">
                  {project.category}
                </span>
              </div>
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                <p className="text-xs text-zinc-400 mt-2 font-light">
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
