import { useState, useEffect } from "react";

import CoelacanthSilhouette from "@/assets/silhouettes/Coelacanth.png";
import TiktaalikSilhouette from "@/assets/silhouettes/Tiktaalik.png";
import FrogSilhouette from "@/assets/silhouettes/Frog.png";
import TortoiseSilhouette from "@/assets/silhouettes/Tortoise.png";
import RatSilhouette from "@/assets/silhouettes/Rat.png";
import BatSilhouette from "@/assets/silhouettes/Bat.png";

const silhouettes = [
  { src: CoelacanthSilhouette, name: "Coelacanth" },
  { src: TiktaalikSilhouette, name: "Tiktaalik" },
  { src: FrogSilhouette, name: "Hairy Frog" },
  { src: TortoiseSilhouette, name: "Tortoise" },
  { src: RatSilhouette, name: "Rat" },
  { src: BatSilhouette, name: "Bat" },
];

export default function SilhouetteShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % silhouettes.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center px-6 py-8">
      <div
        className="relative flex items-center justify-center rounded-3xl bg-primary/30 border border-primary/40"
        style={{
          boxShadow: "0 0 60px 30px hsl(var(--primary) / 0.25)",
        }}
      >
        {/* Inner glow overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 pointer-events-none" />

        {/* Silhouette container - responsive sizing */}
        <div className="relative w-[140px] h-[140px] md:w-[280px] md:h-[280px] m-6 md:m-10 flex items-center justify-center">
          <img
            src={silhouettes[currentIndex].src}
            alt={silhouettes[currentIndex].name}
            className={`max-w-full max-h-full object-contain transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
