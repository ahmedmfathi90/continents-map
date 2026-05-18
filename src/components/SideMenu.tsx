import React from 'react';
import { Home, Map, Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface SideMenuProps {
  isFlat: boolean;
  toggleMapType: () => void;
  goHome: () => void;
}

export const SideMenu: React.FC<SideMenuProps> = ({ isFlat, toggleMapType, goHome }) => {

  const navItems = [
    {
      id: 'home',
      icon: <Home size={28} />,
      label: 'الرئيسية (Home)',
      onClick: goHome,
      color: "hover:bg-blue-500/20 hover:text-blue-400"
    },
    {
      id: 'map',
      icon: isFlat ? <Globe size={28} /> : <Map size={28} />,
      label: isFlat ? 'مجسم الكرة الأرضية' : 'خريطة مسطحة',
      onClick: toggleMapType,
      color: "hover:bg-emerald-500/20 hover:text-emerald-400"
    }
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-4 p-2 sm:p-4 z-40" dir="rtl">
      {navItems.map((item) => (
        <div key={item.id} className="relative group flex items-center">
          <button
            onClick={item.onClick}
            className={`p-2 sm:p-4 bg-slate-800/80 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl text-slate-300 border border-slate-700/50 transition-all duration-300 transform group-hover:-translate-x-2 ${item.color}`}
          >
            {item.icon}
          </button>
          
          <div className="absolute right-full mr-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="bg-slate-900 border border-slate-700 text-white px-4 py-2 rounded-xl whitespace-nowrap shadow-xl text-sm font-medium">
               {item.label}
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};
