import React, { useState, useEffect, MouseEvent } from 'react';
import './TrailComponent.css'; // Import your CSS file for styling

const TrailComponent: React.FC = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; color: string }[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const colors = ['#ff0000', '#00ff00', '#0000ff']; // RGB colors: red, green, blue

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (isDrawing) {
      const { clientX, clientY } = event;
      setTrail((prevTrail) => [
        ...prevTrail,
        { x: clientX, y: clientY, color: colors[prevTrail.length % colors.length] },
      ]);
    }
  };

  const handleMouseEnter = () => {
    setIsDrawing(true);
  };

  const handleMouseLeave = () => {
    setIsDrawing(false);
    startFading();
  };

  const startFading = () => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => {
        if (prevTrail.length > 0) {
          return prevTrail.slice(1); // Remove the first point from the trail
        } else {
          clearInterval(interval);
          return [];
        }
      });
    }, 10); // Adjust the interval for the fading effect (milliseconds)
  };

  useEffect(() => {
    const clearTrail = () => {
      setIsDrawing(false);
      setTrail([]);
    };

    window.addEventListener('mouseleave', clearTrail);

    return () => {
      window.removeEventListener('mouseleave', clearTrail);
    };
  }, []);

  return (
    <div className="trail-container" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <svg className="trail-line">
        
      <defs>
  <pattern id="lineGradient" width="1" height="1" patternContentUnits="objectBoundingBox">
    <rect width="100%" height="100%" fill="#ffffff" />
  </pattern>
</defs>
        {trail.map((point, index) => {
          if (index < trail.length - 1) {
            const nextPoint = trail[index + 1];
            return (
              <line
                key={index}
                x1={point.x}
                y1={point.y}
                x2={nextPoint.x}
                y2={nextPoint.y}
                className="custom-stroke"
              />
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
};

export default TrailComponent;