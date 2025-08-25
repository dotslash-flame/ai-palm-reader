import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Sparkles, Heart, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(147,51,234,0.3),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_50%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Palm Reader AI
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-8">
              Unlock the mysteries of your future with advanced AI palm reading technology. 
              Discover insights about your life, love, and destiny through ancient wisdom 
              powered by modern AI.
            </p>
            
            {/* Tech badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 rounded-full border border-purple-700/30 backdrop-blur-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Powered by AI & built by DotSlash</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-purple-300">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="https://github.com/dotslash-flame" 
                  className="group flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="#how-to-use" 
                  className="group flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="group flex items-center gap-2 text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-lg font-semibold mb-6 text-purple-300">Let&apos;s Connect</h4>
            <div className="space-y-4">
              <a 
                href="https://www.instagram.com/dotslashflame/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">DotSlash FLAME</span>
              </a>

              <a 
                href="https://www.linkedin.com/in/dotslash-flame/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Linkedin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors">DotSlash FLAME</span>
              </a>
              
              <a 
                href="mailto:dotslash@flame.edu.in"
                className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
                  dotslash@flame.edu.in
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom section */}
        <motion.div
          className="mt-16 pt-8 border-t border-gradient-to-r from-transparent via-slate-700 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center sm:items-start gap-1">
              <p className="text-gray-400 text-sm">
                © {currentYear} Palm Reader AI. Crafted with <Heart className="inline w-4 h-4 text-red-400 mx-1" /> by DotSlash for FLAME University Club Fair.
              </p>
              <p className="text-xs text-gray-500">
                Based on original work by{' '}
                <a
                  href="https://github.com/ehernandezvilla"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted hover:text-purple-300"
                >
                  Eric Hernández Villa
                </a>{' '}
                (<a
                  href="https://github.com/ehernandezvilla/palm-reader-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted hover:text-purple-300"
                >
                  repository
                </a>) — MIT licensed.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Built with Next.js</span>
              <span>•</span>
              <span>AI Enhanced</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;