import React, { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#1C1917', '#78716C', '#D6D3D1', '#A8A29E', '#E7E5E4'];

    interface ParticleState {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }

    const createParticle = (): ParticleState => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 8 + 4,
      speedX: Math.random() * 10 - 5,
      speedY: Math.random() * 10 - 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
    });

    const updateParticle = (p: ParticleState): void => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += 0.1;
      p.rotation += p.rotationSpeed;
      if (p.size > 0.2) p.size -= 0.05;
    };

    const drawParticle = (p: ParticleState): void => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    };

    const particles: ParticleState[] = [];
    for (let i = 0; i < 150; i++) {
      particles.push(createParticle());
    }

    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        updateParticle(particles[i]);
        drawParticle(particles[i]);
        
        if (particles[i].size <= 0.2) {
          particles.splice(i, 1);
          i--;
        }
      }

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    };

    animate();

    const handleResize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[100]"
    />
  );
};

export default Confetti;
