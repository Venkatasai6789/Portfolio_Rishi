import { motion } from 'motion/react';
import { Code2, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Mediconnect.ai',
    subtitle: 'Medical Platform',
    role: 'Backend Developer',
    category: 'AI Healthcare / 2024',
    description:
      'An AI-powered healthcare platform with intelligent RAG-based diagnosis, real-time video consultations, lab report management, and integrated online pharmacy.',
    stack: ['Python', 'React.js', 'Node.js', 'LLM', 'TypeScript', 'Gemini API', 'WebRTC'],
    image: '/mediconnect.png',
    code: 'https://github.com/Geetheshwar420/MedConnect',
    live: '#',
  },
  {
    title: 'CapacityCare',
    subtitle: 'Hospital Dashboard',
    role: 'Full Stack Developer',
    category: 'Healthcare Analytics / 2024',
    description:
      'A hospital analytics platform with dynamic descriptive visualizations, interactive departmental insights, and real-time operational data tracking for informed healthcare management.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    image: '/capacitycare.jpg',
    code: 'https://github.com/Rishitha7272/Capacity-Care',
    live: '#',
  },
  {
    title: 'EduBot AI Study Assistant',
    subtitle: 'Conversational Assistant',
    role: 'Full Stack Developer',
    category: 'AI Education / 2024',
    description: 'A fully-featured RAG-based conversational study assistant that ingests academic PDFs, retrieves context-aware knowledge, and delivers intelligent multi-turn responses for seamless student learning.',
    stack: ['Python', 'LangChain', 'Gemini API', 'FAISS', 'React.js'],
    image: '/edubot.png',
    code: 'https://github.com/Rishitha7272/Edubot',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto relative z-10 w-full">
      {/* ── Section Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="mb-16 flex items-center justify-center gap-5"
      >
        {/* Left gradient line */}
        <div
          className="h-[2px] w-24 rounded-full hidden sm:block"
          style={{ background: 'linear-gradient(to right, transparent, #4facfe, #c471ed)' }}
        />

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white whitespace-nowrap">
          My{' '}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #4facfe 0%, #c471ed 60%, #9b59b6 100%)',
              filter: 'drop-shadow(0 0 18px rgba(196,113,237,0.45))',
            }}
          >
            Work
          </span>
        </h2>

        {/* Right gradient line */}
        <div
          className="h-[2px] w-24 rounded-full hidden sm:block"
          style={{ background: 'linear-gradient(to left, transparent, #4facfe, #c471ed)' }}
        />
      </motion.div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer flex flex-col relative"
          >
            {/* Ambient glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4facfe] to-[#c471ed] rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500" />

            <div
              className="flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-3 p-4 relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                backdropFilter: 'blur(24px) saturate(160%)',
                WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)',
              }}
            >
              {/* ── Card image / category banner ── */}
              <div className="aspect-[16/9] bg-black/30 rounded-2xl mb-5 relative overflow-hidden flex items-center justify-center border border-white/5">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay always visible to ensure category text readable */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10" />
                    {/* Gradient tint on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/40 via-[#c471ed]/30 to-[#3a015c]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/50 via-[#c471ed]/50 to-[#3a015c]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/20 via-[#c471ed]/20 to-[#3a015c]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  </>
                )}
                <span className="text-[10px] uppercase tracking-widest text-zinc-300 relative z-20 group-hover:text-white transition-colors duration-300 drop-shadow-md font-medium">
                  {project.category}
                </span>
              </div>

              {/* ── Title & description ── */}
              <div className="px-1 flex flex-col flex-grow">
                <div>
                  <h3 className="text-xl font-semibold text-zinc-100 group-hover:bg-gradient-to-r group-hover:from-[#4facfe] group-hover:to-[#c471ed] group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300 w-fit leading-tight">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="text-xs text-zinc-500 mt-0.5 font-medium">{project.subtitle}</p>
                  )}
                  <p className="text-[11px] text-zinc-600 mt-0.5 uppercase tracking-wider font-medium">
                    {project.role}
                  </p>
                </div>

                <p className="text-sm text-zinc-400 mt-3 font-light leading-relaxed flex-grow">
                  {project.description}
                </p>

                {/* ── Tech Stack chips (blue glass) ── */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium px-3 py-1 rounded-full text-blue-200 tracking-wide"
                      style={{
                        background: 'linear-gradient(135deg, rgba(79,172,254,0.18) 0%, rgba(79,172,254,0.06) 100%)',
                        border: '1px solid rgba(79,172,254,0.28)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* ── Code / Live buttons (purple glass) ── */}
                <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-white/5">
                  <a
                    href={project.code}
                    target={project.code !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl text-purple-200 transition-all duration-300 hover:scale-105 hover:text-white"
                    style={{
                      background: 'linear-gradient(135deg, rgba(196,113,237,0.22) 0%, rgba(90,30,140,0.18) 100%)',
                      border: '1px solid rgba(196,113,237,0.35)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 2px 12px rgba(196,113,237,0.15)',
                    }}
                  >
                    <Code2 size={13} />
                    Code
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
