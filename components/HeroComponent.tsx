import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background image with zoom and parallax effects */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600430073932-e915854d9d4d?q=80&w=2070&auto=format&fit=crop')",
          y,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      />
      
      {/* Overlay to darken the image and improve text readability */}
      <div className="absolute inset-0 bg-black opacity-50" />
      
      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-white mb-4 font-serif"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Palm Reader AI
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-yellow-100 max-w-2xl font-serif"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Unlock the secrets of your future with DotSlash&apos;s mystical AI palm reading
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;