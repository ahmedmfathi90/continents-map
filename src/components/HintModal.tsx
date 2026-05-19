import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play } from 'lucide-react';
import { appConfig } from '../config';

interface HintModalProps {
  onStart: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (isVisible && audioEl) {
      audioEl.play().catch(e => console.warn("Audio play prevented", e));
    }

    return () => {
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    };
  }, [isVisible]);

  const handleStart = () => {
    setIsVisible(false);
    onStart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          dir="rtl"
        >
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="bg-slate-900 border border-slate-700 p-8 rounded-3xl max-w-xl w-full shadow-2xl relative overflow-hidden text-center"
          >
            <audio ref={audioRef} src={appConfig.audio.hintSound} autoPlay className="hidden" />
            <div className="absolute top-0 right-0 p-4">
              <button onClick={() => setIsVisible(false)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
               <span className="text-4xl">🌍</span>
            </div>

            <h3 className={`${appConfig.typography.sizes.hintTitle} font-bold text-white mb-4`}>{appConfig.texts.hintTitle}</h3>
            <p className={`${appConfig.typography.sizes.hintText} leading-relaxed text-slate-300 mb-8 border-r-4 border-blue-500 pr-4 text-right`}>
              "{appConfig.texts.hintMessage}"
            </p>

            <button 
              onClick={handleStart}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 px-10 rounded-full text-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
            >
              <span>ابدأ الاستكشاف</span>
              <Play fill="currentColor" size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
