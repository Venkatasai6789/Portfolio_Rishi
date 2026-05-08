import { motion } from 'motion/react';

const blogs = [
  {
    title: 'The Future of Agentic AI',
    date: 'May 2024',
    readTime: '5 min read',
    excerpt: 'Exploring how autonomous agents are redefining the landscape of software development and productivity.',
    link: '#',
  },
  {
    title: 'Mastering Motion in React',
    date: 'April 2024',
    readTime: '8 min read',
    excerpt: 'A deep dive into creating high-fidelity animations using motion/react and scroll-linked sequences.',
    link: '#',
  },
  {
    title: 'Designing with Glassmorphism',
    date: 'March 2024',
    readTime: '4 min read',
    excerpt: 'Best practices for implementing frosted glass effects while maintaining accessibility and performance.',
    link: '#',
  }
];

export default function Blogs() {
  return (
    <section id="blog" className="py-24 max-w-6xl mx-auto relative z-10 w-full">
      {/* Section Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl flex items-center justify-center opacity-70 mb-24">
        <div className="h-[1px] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-[#c471ed]/50"></div>
        <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_3px_rgba(196,113,237,0.8)] mx-2"></div>
        <div className="h-[1px] w-1/2 bg-gradient-to-l from-transparent via-white/5 to-[#c471ed]/50"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 mt-12"
      >
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            The <span className="bg-gradient-to-r from-[#4facfe] via-[#c471ed] to-[#3a015c] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(196,113,237,0.4)]">blogs</span>
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-[#4facfe]/50 via-[#c471ed]/50 to-transparent flex-grow max-w-sm hidden md:block"></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group cursor-pointer relative"
          >
            <a 
              href={blog.link}
              className="flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 group-hover:-translate-y-3 p-8 relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)',
                backdropFilter: 'blur(24px) saturate(150%)',
                WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">{blog.date}</span>
                <span className="text-[10px] uppercase tracking-widest text-purple-400/80 font-medium">{blog.readTime}</span>
              </div>
              
              <h3 className="text-xl font-semibold text-zinc-100 mb-4 group-hover:text-purple-400 transition-colors duration-300 leading-tight">
                {blog.title}
              </h3>
              
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                {blog.excerpt}
              </p>

              <div className="mt-auto flex items-center gap-2 text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                Read article 
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* Subtle hover glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4facfe]/20 to-[#c471ed]/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500 -z-10" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
