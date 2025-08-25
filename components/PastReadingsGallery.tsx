import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Reading {
  imageData: string;
  timestamp: string;
  reading: string;
}

const PastReadingsGallery: React.FC = () => {
  const [pastReadings, setPastReadings] = useState<Reading[]>([]);

  useEffect(() => {
    const rawReadings = localStorage.getItem('pastReadings');
    if (rawReadings) {
      const allReadings = JSON.parse(rawReadings);
      const completeReadings = allReadings.filter((r: Reading) => r.timestamp && r.reading && r.imageData);
      setPastReadings(completeReadings);
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  }, []);

  const deleteReading = useCallback((index: number) => {
    const updatedReadings = pastReadings.filter((_, i) => i !== index);
    setPastReadings(updatedReadings);
    localStorage.setItem('pastReadings', JSON.stringify(updatedReadings));
  }, [pastReadings]);

  if (pastReadings.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Past Readings Yet</h3>
        <p className="text-purple-200">Your palm reading history will appear here after you get your first reading.</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[600px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastReadings.map((reading, index) => (
            <Dialog key={`${reading.timestamp}-${index}`}>
              <DialogTrigger asChild>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border border-purple-200">
                    <CardContent className="p-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={reading.imageData} 
                        alt={`Palm reading ${index + 1}`} 
                        className="w-full h-48 object-contain bg-gray-50"
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-purple-600 mb-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(reading.timestamp)}
                        </div>
                        <p className="text-sm line-clamp-3 text-gray-700">{reading.reading}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl bg-white/95 backdrop-blur-sm border border-purple-200">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-purple-800 flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Palm Reading {index + 1}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={reading.imageData} 
                      alt={`Palm reading ${index + 1}`} 
                      className="w-full h-auto object-contain rounded-lg border border-purple-200"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-purple-600">
                        <Calendar className="w-4 h-4" />
                        {formatDate(reading.timestamp)}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteReading(index);
                        }}
                        variant="outline"
                        size="sm"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-purple-900 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Your Reading
                      </h3>
                      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{reading.reading}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default PastReadingsGallery;