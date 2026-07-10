import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [cursorType, setCursorType] = useState<"default" | "explore" | "drag" | "close" | "hover">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mounted, setMounted] = useState(false); // Guard for SSR hydration mismatch

  // Mouse coordinate refs
  const mouseCoords = useRef({ x: 0, y: 0 });
  const ringCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true); // Indicate client-side hydration has completed
  }, []);

  useEffect(() => {
    // Check if device is desktop
    const checkDevice = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isTouch || isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Detect scroll to adjust cursor contrast dynamically (capturing inner scroll container)
    const handleScroll = () => {
      const mainEl = document.querySelector("main");
      if (mainEl) {
        setIsPastHero(mainEl.scrollTop > window.innerHeight * 0.9);
      } else {
        setIsPastHero(window.scrollY > window.innerHeight * 0.9);
      }
    };

    window.addEventListener("scroll", handleScroll, true);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current.x = e.clientX;
      mouseCoords.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorAttr = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (cursorAttr === "explore") {
        setCursorType("explore");
      } else if (cursorAttr === "drag") {
        setCursorType("drag");
      } else if (cursorAttr === "close") {
        setCursorType("close");
      } else if (
        target.closest("button") || 
        target.closest("a") || 
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer")
      ) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseover", handleMouseOver);

    // Animation Loop
    let animationFrameId: number;
    const render = () => {
      const lerpFactor = 0.15;
      ringCoords.current.x += (mouseCoords.current.x - ringCoords.current.x) * lerpFactor;
      ringCoords.current.y += (mouseCoords.current.y - ringCoords.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseCoords.current.x}px, ${mouseCoords.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringCoords.current.x}px, ${ringCoords.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, isVisible]);

  // Don't render cursor on server or initial server hydration pass
  if (!mounted || isMobile || !isVisible) return null;

  // Custom Cursor Classes map
  const getRingStyles = () => {
    switch (cursorType) {
      case "explore":
        // Dark charcoal circle to contrast with beige backgrounds
        return "w-20 h-20 bg-[#181c19] border-transparent text-[#faf9f6] scale-100 flex items-center justify-center shadow-lg";
      case "drag":
        // Charcoal circle on dragging track
        return "w-16 h-16 bg-[#1a1c19] border-transparent text-[#faf9f6] scale-100 flex items-center justify-center shadow-lg";
      case "close":
        // Charcoal circle on details modal close
        return "w-14 h-14 bg-[#1a1c19] border-transparent text-[#faf9f6] scale-100 flex items-center justify-center";
      case "hover":
        return isPastHero 
          ? "w-12 h-12 bg-neutral-900/10 border-neutral-900/40 scale-100" 
          : "w-12 h-12 bg-[#faf9f6]/10 border-[#faf9f6]/40 scale-100";
      default:
        return isPastHero
          ? "w-8 h-8 bg-transparent border-neutral-900/60 scale-100"
          : "w-8 h-8 bg-transparent border-[#faf9f6]/60 scale-100";
    }
  };


  const getDotStyles = () => {
    if (cursorType === "explore" || cursorType === "drag" || cursorType === "close") {
      return "scale-0 opacity-0";
    }
    return "scale-100 opacity-100";
  };

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-solid pointer-events-none z-[9999] transition-all duration-300 ease-out will-change-transform ${getRingStyles()}`}
      >
        {cursorType === "explore" && (
          <span className="text-[10px] tracking-[0.2em] font-semibold uppercase animate-fade-in font-body">
            Explore
          </span>
        )}
        {cursorType === "drag" && (
          <span className="text-[10px] tracking-[0.2em] font-semibold uppercase animate-fade-in font-body">
            Drag
          </span>
        )}
        {cursorType === "close" && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-fade-in"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        )}
      </div>

      {/* Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-[10000] transition-all duration-200 ease-out will-change-transform ${getDotStyles()} ${
          isPastHero ? "bg-neutral-950" : "bg-[#faf9f6]"
        }`}
      />
    </>
  );
}
