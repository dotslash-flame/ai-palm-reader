'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PalmReaderFlow from '../components/PalmReaderFlow';
import PastReadingsGallery from '../components/PastReadingsGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, History } from 'lucide-react';
import HowToUse from '@/components/HowToUse';
import Footer from '@/components/Footer';
import HeroComponent from '@/components/HeroComponent';
import NavBarComponent from '@/components/NavBarComponent';
import type {
  HandLandmarker as HandLandmarkerType,
  FilesetResolver as FilesetResolverType,
} from '@mediapipe/tasks-vision';

declare global {
  interface Window {
    HandLandmarker: typeof HandLandmarkerType;
    FilesetResolver: typeof FilesetResolverType;
  }
}

export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@mediapipe/tasks-vision').then(mod => {
        console.log("✅ MediaPipe modules loaded");
        window.HandLandmarker = mod.HandLandmarker;
        window.FilesetResolver = mod.FilesetResolver;
      }).catch(err => {
        console.error("❌ Error loading MediaPipe modules:", err);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <NavBarComponent />
      <HeroComponent />
      
      <main className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <Tabs defaultValue="reading" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20">
              <TabsTrigger 
                value="reading" 
                className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-white font-semibold"
              >
                <Eye className="w-4 h-4 mr-2" />
                New Reading
              </TabsTrigger>
              <TabsTrigger 
                value="history" 
                className="data-[state=active]:bg-white data-[state=active]:text-purple-900 text-white font-semibold"
              >
                <History className="w-4 h-4 mr-2" />
                Past Readings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reading" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
                  <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Eye className="w-4 h-4" />
                    </div>
                    New Palm Reading
                  </h2>
                  <p className="text-purple-100 mt-2 text-center">Discover your destiny through the power of AI</p>
                </div>

                <div className="p-8">
                  <PalmReaderFlow />
                </div>
              </motion.div>
            </TabsContent>

            <TabsContent value="history">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
                  <h2 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <History className="w-4 h-4" />
                    </div>
                    Past Readings
                  </h2>
                  <p className="text-amber-100 mt-2 text-center">Revisit your previous palm reading insights</p>
                </div>

                <div className="p-8">
                  <PastReadingsGallery />
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        <HowToUse />
      </main>
      
      <Footer />
    </div>
  );
}
