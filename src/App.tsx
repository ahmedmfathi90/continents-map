/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SpaceBackground } from './components/SpaceBackground';
import { InteractiveGlobe } from './components/InteractiveGlobe';
import { ContinentPanel } from './components/ContinentPanel';
import { HintModal } from './components/HintModal';
import { SideMenu } from './components/SideMenu';
import { appConfig } from './config';

const continentList = [
  "Africa",
  "Asia",
  "Europe",
  "South America",
  "Australia",
  "North America",
  "Antarctica"
];

export default function App() {
  const [appStarted, setAppStarted] = useState(false);
  const [isFlat, setIsFlat] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  React.useEffect(() => {
    if (!appStarted) return;
    const clickAudio = new Audio(appConfig.audio.clickEffect);
    const handleClick = () => {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [appStarted]);

  const handleNext = () => {
    if (!selectedContinent) return;
    const currentIndex = continentList.indexOf(selectedContinent);
    const nextIndex = (currentIndex + 1) % continentList.length;
    setSelectedContinent(continentList[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedContinent) return;
    const currentIndex = continentList.indexOf(selectedContinent);
    const prevIndex = (currentIndex - 1 + continentList.length) % continentList.length;
    setSelectedContinent(continentList[prevIndex]);
  };

  if (!appStarted) {
    return (
      <div 
        className="fixed inset-0 w-full h-full flex flex-col items-center justify-center bg-slate-900 cursor-pointer z-[9999]"
        onClick={() => setAppStarted(true)}
        dir="rtl"
      >
        <SpaceBackground />
        <div className="z-10 bg-slate-800/80 backdrop-blur-md p-10 rounded-3xl border border-slate-700 shadow-2xl text-center transform transition-all hover:scale-105">
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400">
             <span className="text-5xl">🌍</span>
          </div>
          <h1 className={`${appConfig.typography.sizes.continentTitle} text-white font-bold mb-4`}>خريطة القارات التفاعلية</h1>
          <p className="text-xl text-blue-400 animate-pulse font-medium">انقر في أي مكان للبدء</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-screen overflow-hidden select-none text-slate-100"
      style={{ fontFamily: appConfig.typography.fontFamily }}
    >
      <SpaceBackground />
      <HintModal onStart={() => console.log('Started')} />
      <SideMenu 
        isFlat={isFlat} 
        toggleMapType={() => setIsFlat(!isFlat)} 
        goHome={() => {
           setSelectedContinent(null);
           setIsFlat(false);
        }}
      />

      <div 
        className={`transition-all duration-700 ease-in-out w-full h-full flex items-center justify-center transform ${
          selectedContinent ? 'pl-0 landscape:pl-[50vw] md:landscape:pl-[400px] md:pl-[400px]' : ''
        }`}
      >
        <InteractiveGlobe 
          isFlat={isFlat} 
          selectedContinent={selectedContinent}
          onSelectContinent={setSelectedContinent}
        />
      </div>

      <ContinentPanel 
        continentId={selectedContinent} 
        onClose={() => setSelectedContinent(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
