import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import { animate, motion, AnimatePresence } from "motion/react";
import continentsGeo from "../data/continentsGeo.json";


interface InteractiveGlobeProps {
  isFlat: boolean;
  selectedContinent: string | null;
  onSelectContinent: (continent: string | null) => void;
}

const continentCenters: Record<string, [number, number, number]> = {
  "Africa": [-20, 0, 0],
  "Asia": [-90, -40, 0],
  "Europe": [-20, -55, 0],
  "South America": [60, 15, 0],
  "Australia": [-135, 25, 0],
  "North America": [100, -45, 0],
  "Antarctica": [0, 90, 0],
};

const continentColors: Record<string, { fill: string; stroke: string }> = {
  "Africa": { fill: "#DCC298", stroke: "#B59B6D" },
  "Asia": { fill: "#BFCC9E", stroke: "#98A67A" },
  "Europe": { fill: "#A4B581", stroke: "#80925C" },
  "South America": { fill: "#8AB075", stroke: "#668C51" },
  "Australia": { fill: "#D8BA8E", stroke: "#B09368" },
  "North America": { fill: "#D3CCA4", stroke: "#A8A17A" },
  "Antarctica": { fill: "#F0F4F8", stroke: "#C3D0DF" },
};

export const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({
  isFlat,
  selectedContinent,
  onSelectContinent,
}) => {
  const [rotation, setRotation] = useState<[number, number, number]>([-10, -20, 0]);
  const rotationRef = useRef(rotation);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [globeZoom, setGlobeZoom] = useState(1);
  const [startDist, setStartDist] = useState<number | null>(null);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  // Handle selected continent rotation animation
  useEffect(() => {
    if (selectedContinent && !isFlat && !isDragging) {
      const target = continentCenters[selectedContinent];
      if (target) {
        const r0 = animate(rotationRef.current[0], target[0], {
          type: "spring",
          stiffness: 80,
          damping: 20,
          onUpdate: (v) => setRotation((prev) => [v, prev[1], prev[2]]),
        });
        const r1 = animate(rotationRef.current[1], target[1], {
          type: "spring",
          stiffness: 80,
          damping: 20,
          onUpdate: (v) => setRotation((prev) => [prev[0], v, prev[2]]),
        });
        return () => {
          r0.stop();
          r1.stop();
        };
      }
    }
  }, [selectedContinent, isFlat, isDragging]);

  // Resize observer
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPinchDist = (e: React.TouchEvent) => {
    if (e.touches.length >= 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    return null;
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in e && e.touches.length >= 2) {
        setIsDragging(false);
        setStartDist(getPinchDist(e as React.TouchEvent));
      } else {
        setIsDragging(true);
        const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        setStartPos({ x: clientX, y: clientY });
        setStartDist(null);
      }
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if ("touches" in e && e.touches.length >= 2) {
        if (startDist) {
          const currentDist = getPinchDist(e as React.TouchEvent);
          if (currentDist) {
            const scaleChange = (currentDist - startDist) * 0.01;
            setGlobeZoom((prev) => Math.max(0.5, Math.min(prev + scaleChange, 5)));
            setStartDist(currentDist);
          }
        }
      } else if (isDragging && !isFlat) {
        const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
        const dx = clientX - startPos.x;
        const dy = clientY - startPos.y;
        setRotation((r) => [r[0] + dx * 0.5, Math.max(-80, Math.min(80, r[1] - dy * 0.5)), 0]);
        setStartPos({ x: clientX, y: clientY });
      }
    },
    [isDragging, startPos, startDist, isFlat]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setStartDist(null);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isFlat) {
      setGlobeZoom((prev) => Math.max(0.5, Math.min(prev - e.deltaY * 0.002, 5)));
    }
  }, [isFlat]);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center cursor-move touch-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      onWheel={handleWheel}
    >

      <AnimatePresence mode="wait">
        <motion.div
          key={isFlat ? "flat" : "globe"}
          initial={{ opacity: 0, scale: 0.8, rotate: isFlat ? -5 : 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 1.1, rotate: isFlat ? 5 : -5 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          <ComposableMap
            projection={isFlat ? "geoEqualEarth" : "geoOrthographic"}
            projectionConfig={{
              rotate: isFlat ? [0, 0, 0] : rotation,
              scale: isFlat ? Math.min(160, windowWidth * 0.35) : Math.min(230, windowWidth * 0.28) * globeZoom,
            }}
            width={800}
            height={600}
            style={{ width: "100%", height: "100%", maxHeight: "90vh", outline: "none" }}
          >
            {isFlat ? (
              renderGeographies(selectedContinent, onSelectContinent)
            ) : (
              <>
                <defs>
                  <radialGradient id="globeShadow" cx="50%" cy="50%" r="50%" fx="60%" fy="60%">
                    <stop offset="50%" stopColor="#000000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.5" />
                  </radialGradient>
                  <radialGradient id="globeHighlight" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <Sphere stroke="#568BBB" strokeWidth={1} fill="#5692C4" id="sphere" />
                <Graticule stroke="#FFFFFF" strokeWidth={0.5} strokeOpacity={0.25} />
                {renderGeographies(selectedContinent, onSelectContinent)}
                
                {/* 3D Overlays - pointer-events none so they don't block dragging */}
                <Sphere stroke="none" fill="url(#globeShadow)" style={{ pointerEvents: 'none' }} />
                <Sphere stroke="none" fill="url(#globeHighlight)" style={{ pointerEvents: 'none' }} />
              </>
            )}
          </ComposableMap>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const renderGeographies = (
  selectedContinent: string | null,
  onSelectContinent: (c: string | null) => void
) => (
  <Geographies geography={continentsGeo}>
    {({ geographies }) =>
      geographies.map((geo) => {
        const continent = geo.properties.continent;
        const isSelected = selectedContinent === continent;
        const baseColor = continentColors[continent] || { fill: "#4ADE80", stroke: "#166534" };

        return (
          <Geography
            key={continent}
            geography={geo}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            onClick={() => {
              onSelectContinent(isSelected ? null : continent);
            }}
            style={{
              default: {
                fill: isSelected ? "#FCD34D" : baseColor.fill,
                stroke: isSelected ? "#F59E0B" : baseColor.stroke,
                strokeWidth: isSelected ? 1.5 : 0.5,
                outline: "none",
                cursor: "pointer",
                transition: "fill 250ms, stroke 250ms, stroke-width 250ms",
              },
              hover: {
                fill: isSelected ? "#FCD34D" : baseColor.fill,
                stroke: isSelected ? "#F59E0B" : baseColor.stroke,
                strokeWidth: 1.5,
                outline: "none",
                cursor: "pointer",
                opacity: 0.8,
              },
              pressed: {
                fill: "#FBBF24",
                stroke: "#D97706",
                strokeWidth: 2,
                outline: "none",
              },
            }}
          />
        );
      })
    }
  </Geographies>
);
