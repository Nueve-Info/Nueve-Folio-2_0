import { motion } from "framer-motion";
import { useRef } from "react";

// Import logos
import claudeLogo from "../../Bubble/Claude_AI_symbol.svg";
import cursorLogo from "../../Bubble/cursor.svg";
import figmaLogo from "../../Bubble/Figma-logo.svg";
import midjourneyLogo from "../../Bubble/Midjourney_Emblem.svg";
import vercelLogo from "../../Bubble/vercel-icon-svgrepo-com.svg";
import unknownLogo from "../../Bubble/idpaYXrebE_1770481936357.svg";

const logos = [
  { src: claudeLogo, alt: "Claude AI" },
  { src: cursorLogo, alt: "Cursor" },
  { src: figmaLogo, alt: "Figma" },
  { src: midjourneyLogo, alt: "Midjourney" },
  { src: vercelLogo, alt: "Vercel" },
  { src: unknownLogo, alt: "Partner" },
];

export function FloatingBubbles({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null!);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none ${className || 'z-0'}`}
    >
      {logos.map((logo, index) => (
        <Bubble 
          key={index} 
          logo={logo} 
          index={index} 
          containerRef={containerRef} 
        />
      ))}
    </div>
  );
}

function Bubble({ logo, index, containerRef }: { logo: { src: string; alt: string }; index: number; containerRef: React.RefObject<HTMLDivElement> }) {
  // Scatter positions around the edges to avoid the center text
  const positions = [
    { x: 5, y: 10 },   // Top Left
    { x: 90, y: 15 },  // Top Right
    { x: 8, y: 45 },   // Middle Left
    { x: 88, y: 50 },  // Middle Right
    { x: 15, y: 80 },  // Bottom Left
    { x: 80, y: 85 },  // Bottom Right
  ];

  const pos = positions[index % positions.length];
  
  // Add some randomness
  const randomX = (Math.random() - 0.5) * 15;
  const randomY = (Math.random() - 0.5) * 15;
  
  const initialX = Math.max(0, Math.min(100, pos.x + randomX));
  const initialY = Math.max(0, Math.min(100, pos.y + randomY));

  // Randomize float duration and delay
  const duration = 4 + Math.random() * 2;
  const delay = Math.random() * 2;
  
  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.1}
      whileHover={{ scale: 1.1, cursor: "grab" }}
      whileDrag={{ scale: 1.2, cursor: "grabbing" }}
      initial={{ left: `${initialX}%`, top: `${initialY}%`, opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        y: [0, -15, 0], // Float up and down
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
        y: {
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "reverse",
          delay: delay
        }
      }}
      className="absolute pointer-events-auto"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg ring-1 ring-black/5 transition-colors hover:bg-white/20">
        <img 
          src={logo.src} 
          alt={logo.alt} 
          className="h-7 w-7 object-contain" 
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
