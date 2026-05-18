import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, ChevronRight, ChevronLeft } from 'lucide-react';
import { continentsData } from '../data/continents';
import { appConfig } from '../config';

interface ContinentPanelProps {
  continentId: string | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ContinentPanel: React.FC<ContinentPanelProps> = ({ 
  continentId, 
  onClose,
  onNext,
  onPrev
}) => {
  const data = continentId ? continentsData[continentId] : null;

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (!continentId) return;
    
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // Attempt to play the continent's specific mp3 file
    const newAudio = new Audio(appConfig.audio.getContinentSound(continentId));
    audioRef.current = newAudio;
    newAudio.play().catch((err) => {
      console.warn("Autoplay or audio play prevented", err);
    });
  };

  React.useEffect(() => {
    if (data) {
       playAudio();
    }
    return () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };
  }, [continentId, data]);

  return (
    <AnimatePresence>
      {continentId && data && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 h-full w-full md:w-[400px] bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 shadow-2xl p-4 sm:p-6 md:p-10 flex flex-col z-40"
          dir="rtl"
        >
          <div className="flex justify-between items-center mb-8">
            <button 
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
                onClose();
              }}
              className="p-2 bg-slate-800 text-slate-300 hover:bg-red-500/20 hover:text-red-400 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <h2 className={`${appConfig.typography.sizes.continentTitle} font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400`}>
              {data.name}
            </h2>
          </div>

          <div className="flex-grow overflow-y-auto pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 transparent' }}>
            <p className={`${appConfig.typography.sizes.continentText} leading-relaxed text-slate-200 font-medium`}>
              {data.text}
            </p>
          </div>

          <div className="mt-8 flex justify-between items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
             <button onClick={onNext} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <ChevronRight size={20} />
                <span>التالي</span>
             </button>
             
             <button 
                onClick={() => playAudio()}
                className="p-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-full transition-all shadow-lg hover:shadow-blue-500/50 group"
                title="استمع إلى الصوت"
              >
                <Volume2 size={24} className="group-hover:scale-110 transition-transform" />
             </button>

             <button onClick={onPrev} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                <span>السابق</span>
                <ChevronLeft size={20} />
             </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
