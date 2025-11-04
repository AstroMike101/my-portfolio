import { useEffect, useRef } from 'react';

export default function MatrixRain({ side = 'left', darkMode = false }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Set canvas size - wider for more coverage
    const setCanvasSize = () => {
      canvas.width = 150;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // Katakana characters for authentic Matrix look
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '¦çﾘｸ.:=*+-<>¢£¥';
    const chars = katakana + latin + nums + symbols;
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store the y position and speed of each column
    const drops = Array(columns).fill(0).map(() => ({
      y: Math.random() * -100,
      speed: Math.random() * 0.7 + 0.8 // Faster speeds
    }));

    // Animation function
    const draw = () => {
      // Clear with transparency for overlay effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle fade effect
      ctx.fillStyle = darkMode ? 'rgba(10, 10, 10, 0.1)' : 'rgba(250, 250, 250, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i].y * fontSize;

        // Brighter head of the trail with glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#0F0';
        ctx.fillStyle = '#0F0';
        ctx.fillText(char, x, y);
        ctx.shadowBlur = 0;
        
        // Longer, dimmer trail characters
        for (let j = 1; j < 8; j++) {
          const trailY = y - (j * fontSize);
          if (trailY > 0) {
            ctx.fillStyle = `rgba(0, 255, 0, ${0.9 - (j * 0.11)})`;
            const trailChar = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(trailChar, x, trailY);
          }
        }

        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.95) {
          drops[i].y = 0;
          drops[i].speed = Math.random() * 0.7 + 0.8;
        }

        // Increment y coordinate with variable speed
        drops[i].y += drops[i].speed;
      }
    };

    // Animation loop - 60fps
    const interval = setInterval(draw, 33);

    // Handle window resize
    const handleResize = () => {
      setCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [darkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="hidden md:block fixed top-20 pointer-events-none z-[5]"
      style={{
        [side]: 0,
        height: 'calc(100vh - 5rem)',
        mixBlendMode: darkMode ? 'screen' : 'multiply',
        opacity: 0.7,
      }}
    />
  );
}