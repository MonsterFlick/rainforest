import { useRef, useState, ReactElement, HTMLAttributes } from "react";

interface MagneticProps {
  children: ReactElement;
  range?: number; // active distance radius
  strength?: number; // strength multiplier (0 to 1)
}

export function Magnetic({ children, range = 50, strength = 0.35 }: MagneticProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Calculate straight-line distance
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Pull element toward the cursor based on distance
      // Closer = stronger pull
      const factor = (range - distance) / range; // 0 (far) to 1 (near)
      setPosition({
        x: distanceX * strength * factor,
        y: distanceY * strength * factor
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  // Determine transition dynamic styles
  // Return to origin uses a springy ease, hover uses immediate response
  const isAtOrigin = position.x === 0 && position.y === 0;
  const style = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: isAtOrigin
      ? "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)" // springy return
      : "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)", // lag follow
    willChange: "transform",
    display: "inline-block",
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="inline-block"
    >
      {children}
    </div>
  );
}
