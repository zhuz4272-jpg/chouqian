import React, { useEffect, useState } from 'react';

interface ParticleBurstProps {
  color: string;
  count?: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({ color, count = 30 }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles on mount
    const newParticles = Array.from({ length: count }).map((_, i) => {
      const angle = Math.random() * 360;
      const velocity = 80 + Math.random() * 100; // Distance to travel
      const radian = (angle * Math.PI) / 180;
      return {
        id: i,
        x: Math.cos(radian) * velocity,
        y: Math.sin(radian) * velocity,
        size: 5 + Math.random() * 7,
        duration: 0.8 + Math.random() * 0.4,
        delay: Math.random() * 0.1
      };
    });
    setParticles(newParticles);
  }, [count]);

  return (
    <div className="absolute top-1/2 left-1/2 w-0 h-0 z-50 overflow-visible pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            left: -p.size / 2,
            top: -p.size / 2,
            animation: `particle-explode ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${p.delay}s`,
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};