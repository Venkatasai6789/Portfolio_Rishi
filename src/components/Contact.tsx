import { motion } from 'motion/react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 mb-20 relative z-10 w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl px-6"
      >
        <div className="w-20 h-1 bg-purple-500 rounded-full mb-10 mx-auto"></div>
        <h2 className="text-sm font-medium text-purple-400 uppercase tracking-[0.3em] mb-6 shadow-purple-500/20">What's Next?</h2>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8">
          Get in Touch
        </h3>
        <p className="text-lg text-zinc-400 font-light mb-12 leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question, want to collaborate on a new project, or just want to say hi, my inbox is always open.
        </p>
        
        <a 
          href="mailto:hello@example.com" 
          className="inline-block px-10 py-4 bg-brand-purple hover:bg-purple-600 text-white rounded-lg transition-all shadow-[0_0_20px_rgba(58,1,92,0.4)] hover:shadow-[0_0_30px_rgba(157,78,221,0.6)] font-medium tracking-wide"
        >
          Say Hello
        </a>
      </motion.div>
    </section>
  );
}
