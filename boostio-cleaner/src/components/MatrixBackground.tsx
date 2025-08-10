import React, { useEffect, useRef } from 'react';

interface MatrixColumn {
  x: number;
  y: number;
  speed: number;
  text: string;
  opacity: number;
  type: 'binary' | 'code';
}

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const columnsRef = useRef<MatrixColumn[]>([]);

  const codeSnippets = [
    'const', 'function', 'return', 'if', 'else', 'for', 'while',
    'import', 'export', 'class', 'extends', 'async', 'await',
    'try', 'catch', 'throw', 'new', 'this', 'super', 'static',
    'let', 'var', '=>', '()', '{}', '[]', '//', '/* */',
    'clean', 'optimize', 'boost', 'scan', 'fix', 'speed',
    '<div>', '</div>', '<>', '</>', 'css', 'html', 'jsx',
    '++', '--', '+=', '-=', '*=', '/=', '%=', '**'
  ];
  
  const binaryChars = ['0', '1', '01', '10', '00', '11', '101', '010', '111', '000', '0101', '1010', '1111', '0000'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeColumns();
    };

    const initializeColumns = () => {
      const columnWidth = 20;
      const columnCount = Math.floor(canvas.width / columnWidth);
      columnsRef.current = [];

      for (let i = 0; i < columnCount; i++) {
        const type = Math.random() > 0.3 ? 'code' : 'binary';
        const textArray = type === 'code' ? codeSnippets : binaryChars;
        
        columnsRef.current.push({
          x: i * columnWidth,
          y: Math.random() * -canvas.height,
          speed: type === 'binary' ? 0.75 + Math.random() * 0.5 : 0.5 + Math.random() * 0.3,
          text: textArray[Math.floor(Math.random() * textArray.length)],
          opacity: Math.random() * 0.5 + 0.3,
          type: type
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 11, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      columnsRef.current.forEach((column, index) => {
        // Set font style
        ctx.font = column.type === 'binary' ? '12px Consolas, monospace' : '14px Consolas, monospace';
        
        // Set color based on type
        if (column.type === 'binary') {
          ctx.fillStyle = `rgba(125, 211, 192, ${column.opacity})`;
        } else {
          ctx.fillStyle = `rgba(139, 155, 243, ${column.opacity})`;
        }

        // Draw text
        ctx.fillText(column.text, column.x, column.y);

        // Update position
        column.y += column.speed;

        // Reset if off screen
        if (column.y > canvas.height) {
          column.y = -20;
          const textArray = column.type === 'code' ? codeSnippets : binaryChars;
          column.text = textArray[Math.floor(Math.random() * textArray.length)];
          column.opacity = Math.random() * 0.5 + 0.3;
          
          // Occasionally change type
          if (Math.random() > 0.9) {
            column.type = column.type === 'code' ? 'binary' : 'code';
            column.speed = column.type === 'binary' ? 0.75 + Math.random() * 0.5 : 0.5 + Math.random() * 0.3;
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10" style={{ background: 'rgb(10, 11, 15)' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
    </div>
  );
};

export default MatrixBackground;