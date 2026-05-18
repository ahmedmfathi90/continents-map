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
  const [isFlat, setIsFlat] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  React.useEffect(() => {
    const clickAudio = new Audio(appConfig.audio.clickEffect);
    const handleClick = () => {
      clickAudio.currentTime = 0;
      clickAudio.play().catch(() => {});
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

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
        className="transition-all duration-700 ease-in-out w-full h-full flex items-center justify-center transform"
        style={{ paddingLeft: selectedContinent && window.innerWidth >= 768 ? 400 : 0 }}
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
