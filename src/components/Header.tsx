import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-black/80 backdrop-blur-md shadow-[0_1px_2px_rgba(255,255,255,0.05)] py-4' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 z-50 group">
          {/* Logo icon */}
          <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-purple-400 group-hover:border-purple-500 transition-colors shadow-[0_0_15px_rgba(58,1,92,0.5)]">
            <span className="font-bold text-lg font-mono tracking-tighter">RT</span>
          </div>
          <span className="text-lg font-semibold tracking-wide text-zinc-200 hidden sm:block">
            Rishitha Tedlapalli
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center">
          <ul className="flex gap-6 text-[13px] font-medium text-zinc-400 tracking-wider">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="hover:text-purple-400 transition-colors relative group py-2">
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Nav Toggle */}
        <button 
          className="lg:hidden z-50 text-zinc-300 p-2 -mr-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X strokeWidth={1.5} /> : <Menu strokeWidth={1.5} />}
        </button>

        {/* Mobile Nav Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-brand-midnight z-40 flex justify-center items-center"
            >
              <nav className="flex flex-col items-center w-full px-6">
                <ul className="flex flex-col items-center gap-6 text-xl font-medium text-zinc-300 w-full">
                  {navLinks.map((link) => (
                    <li key={link.name} className="w-full text-center border-b border-zinc-800/50 pb-4">
                      <a 
                        href={link.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="hover:text-purple-400 transition-colors block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
