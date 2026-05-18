import React from 'react';

export const SpaceBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-black"></div>
      
      {/* Generate some random stars using CSS */}
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '100px 100px', opacity: 0.1 }}></div>
      <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '250px 250px', opacity: 0.2, backgroundPosition: '50px 50px' }}></div>
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
    </div>
  );
};
