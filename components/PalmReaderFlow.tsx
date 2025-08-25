'use client';
import { useState, useRef } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Upload, Sparkles, Eye, AlertCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Webcam from 'react-webcam';

export default function PalmReaderFlow() {
  const [imageData, setImageData] = useState<string | null>(null);
  const [handDetected, setHandDetected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImageData(result);
        setHandDetected(null);
        setReading(null);
        setError(null);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleWebcamCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImageData(imageSrc);
      setHandDetected(null);
      setReading(null);
      setError(null);
      setIsWebcamOpen(false);
    }
  };

  const validateHand = async () => {
    if (!imgRef.current || !imageData) return;
    setIsLoading(true);
    setError(null);

    try {
      const vision = await FilesetResolver.forVisionTasks('/models');
      console.log('Fileset resolver initialized:', vision);
      
      const detector = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: '/models/hand_landmarker.task',
        },
        runningMode: 'IMAGE',
        numHands: 2,
      });

      const result = detector.detect(imgRef.current);
      const hasHand = result.handedness.length > 0;
      setHandDetected(hasHand);
      
      if (!hasHand) {
        setError("Did not detect a clear hand in the image. Please take a clearer photo of your palm.");
      }
    } catch (err) {
      console.error('Error validating hand:', err);
      setError("Error validating image. Please try again.");
      setHandDetected(false);
    } finally {
      setIsLoading(false);
    }
  };

  const sendToGemini = async () => {
    if (!imageData) return;
    setIsLoading(true);
    setError(null);

    try {
      const analysisRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData }),
      });

      if (!analysisRes.ok) {
        throw new Error('Failed to analyze palm');
      }

      const { reading } = await analysisRes.json();
      setReading(reading);
      
      // Save reading to local storage
      const newReading = {
        imageData,
        timestamp: new Date().toISOString(),
        reading
      };
      const pastReadings = JSON.parse(localStorage.getItem('pastReadings') || '[]');
      pastReadings.push(newReading);
      localStorage.setItem('pastReadings', JSON.stringify(pastReadings));
      
    } catch (err) {
      console.error('Error analyzing palm:', err);
      setError("Error analyzing palm. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-purple-800">
            ✨ Palm Reading Analysis ✨
          </h2>
          
          {/* File Upload Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Palm Image
              </Button>
              <Button
                onClick={() => setIsWebcamOpen(true)}
                variant="outline"
                className="border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium"
              >
                <Camera className="w-5 h-5 mr-2" />
                Take Photo
              </Button>
            </div>

            {/* Webcam Section */}
            {isWebcamOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4"
              >
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  className="rounded-lg border-2 border-purple-200 mx-auto"
                  width={320}
                />
                <div className="flex gap-4 justify-center">
                  <Button onClick={handleWebcamCapture} className="bg-green-600 hover:bg-green-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Capture
                  </Button>
                  <Button onClick={() => setIsWebcamOpen(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Image Preview */}
            {imageData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="border-2 border-purple-200 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={imgRef}
                    src={imageData}
                    alt="Palm preview"
                    className="w-full max-h-96 object-contain"
                  />
                </div>
                
                <div className="text-center">
                  <Button
                    onClick={validateHand}
                    disabled={isLoading}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Validating...
                      </>
                    ) : (
                      <>
                        <Eye className="w-5 h-5 mr-2" />
                        Validate Hand
                      </>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Hand Detection Result */}
            {handDetected === true && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-300 rounded-lg p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-green-700 mb-3">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Hand detected successfully!</span>
                </div>
                <Button
                  onClick={sendToGemini}
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Get Palm Reading
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {handDetected === false && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-300 rounded-lg p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">No clear hand detected</span>
                </div>
                <p className="text-red-600 text-sm mt-1">
                  Please ensure your palm is clearly visible and well-lit in the image.
                </p>
              </motion.div>
            )}

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-300 rounded-lg p-4 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Error</span>
                </div>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </motion.div>
            )}

            {/* Reading Display */}
            {reading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-300 rounded-lg p-6"
              >
                <h3 className="text-orange-800 font-bold text-xl mb-4 text-center flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  Your Palm Reading
                  <Sparkles className="w-6 h-6" />
                </h3>
                <div className="prose prose-orange max-w-none">
                  <p className="text-orange-800 leading-relaxed whitespace-pre-wrap">{reading}</p>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
