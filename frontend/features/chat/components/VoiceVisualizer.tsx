'use client';

import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
  isActive: boolean;
}

export function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  return (
    <div className="w-full h-32 mb-8 flex items-center justify-center bg-background">
      <motion.div 
        className="relative w-32 h-32"
        initial={false}
      >
        <motion.div
          className="absolute inset-0"
          animate={isActive ? {
            borderRadius: "50%",
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 0.8, 0.5]
          } : {
            borderRadius: [
              "67% 33% 63% 37% / 37% 63% 37% 63%",
              "37% 63% 51% 49% / 42% 37% 63% 58%",
              "36% 64% 64% 36% / 64% 48% 52% 36%",
              "43% 57% 50% 50% / 38% 54% 46% 62%",
              "67% 33% 63% 37% / 37% 63% 37% 63%"
            ],
            scale: [1, 1.1, 0.9, 1.05, 1],
            opacity: 0.7
          }}
          transition={{
            duration: isActive ? 1.5 : 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundColor: "#61005d",
            filter: "blur(8px)",
            willChange: "transform"
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={isActive ? {
            borderRadius: "50%",
            scale: [1.2, 0.8, 1.2],
            opacity: [0.3, 0.6, 0.3]
          } : {
            borderRadius: [
              "42% 58% 37% 63% / 63% 37% 63% 37%",
              "63% 37% 49% 51% / 37% 63% 37% 63%",
              "64% 36% 36% 64% / 48% 64% 36% 52%",
              "57% 43% 50% 50% / 54% 38% 62% 46%",
              "42% 58% 37% 63% / 63% 37% 63% 37%"
            ],
            scale: [1.1, 0.9, 1.05, 0.95, 1.1],
            opacity: 0.7
          }}
          transition={{
            duration: isActive ? 1.5 : 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
          style={{
            backgroundColor: "#61005d",
            filter: "blur(8px)",
            willChange: "transform"
          }}
        />
      </motion.div>
    </div>
  );
} 