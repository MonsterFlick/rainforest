import { createFileRoute } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import heroVideo from "@/assets/rainforest-hero.mp4.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Home", active: true },
  { label: "Stays", active: false },
  { label: "About", active: false },
  { label: "Journal", active: false },
  { label: "Reach Us", active: false },
];

function Index() {
  const serif = { fontFamily: "'Instrument Serif', serif" };
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setStartTime = () => {
      if (video.currentTime < 5) {
        video.currentTime = 5;
      }
    };

    video.addEventListener("loadedmetadata", setStartTime);
    video.addEventListener("loadeddata", setStartTime);
    video.addEventListener("canplay", setStartTime);
    video.addEventListener("play", setStartTime);

    // Fallback: check every 100ms until the video starts playing from 5s
    const interval = setInterval(() => {
      if (video.currentTime > 0 && video.currentTime < 5) {
        video.currentTime = 5;
        clearInterval(interval);
      }
    }, 100);

    const handleTimeUpdate = () => {
      if (video.currentTime < 0.5) {
        video.currentTime = 5;
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    if (video.currentTime < 5) {
      video.currentTime = 5;
    }

    return () => {
      video.removeEventListener("loadedmetadata", setStartTime);
      video.removeEventListener("loadeddata", setStartTime);
      video.removeEventListener("canplay", setStartTime);
      video.removeEventListener("play", setStartTime);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <div className="relative min-h-screen w-full overflow-hidden bg-background">
        <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroVideo.url}
      />
      <div className="absolute inset-0 z-[1] bg-black/50" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <nav className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
          <a href="/" className="text-3xl tracking-tight text-foreground" style={serif}>
            Rainforest Farms<sup className="text-xs">®</sup>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href="#"
                className={`text-sm transition-colors ${link.active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03]">
            Book a Stay
          </button>
        </nav>

        <section className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px]">
          <h1
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground"
            style={serif}
          >
            Where the forest{" "}
            <em className="not-italic text-muted-foreground">breathes</em> and time{" "}
            <em className="not-italic text-muted-foreground">slows.</em>
          </h1>

          <p className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
            Rainforest Farms is a quiet retreat carved into living jungle. Wake to
            birdsong, wander mist-soaked trails, and rediscover the slow rhythms of
            the wild.
          </p>

          <button className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] cursor-pointer">
            Begin Your Escape
          </button>
        </section>
      </div>
      </div>
      <AmenitiesSection />
    </main>
  );
}

function AmenitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [selectedAmenity, setSelectedAmenity] = useState<{title: string, desc: string} | null>(null);

  useEffect(() => {
    const updateMaxScroll = () => {
      if (trackRef.current) {
        setMaxScroll(trackRef.current.scrollWidth - window.innerWidth + window.innerWidth * 0.1);
      }
    };
    
    updateMaxScroll();
    // Use a small timeout to ensure DOM is fully laid out before calculating
    setTimeout(updateMaxScroll, 100);
    
    window.addEventListener('resize', updateMaxScroll);
    return () => window.removeEventListener('resize', updateMaxScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollableDistance = height - windowHeight;
      let progress = (0 - top) / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const amenities = [
    { title: "Turf", desc: "A pristine playing field carved into the jungle." },
    { title: "Pool", desc: "Infinity edges blending into the canopy." },
    { title: "Food", desc: "Farm-to-table dining, grown steps away." },
    { title: "Rooms", desc: "Sanctuaries of glass and native wood." },
    { title: "Lawn", desc: "Open green spaces for evening bonfires." },
  ];

  // Using the same placeholder image for all, as requested
  const placeholderImage = "https://placehold.co/1200x800/1a2c1e/ffffff?text=Premium+Experience";

  return (
    <section ref={containerRef} className="relative bg-background h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center bg-background border-t border-border/10">
        <div className="absolute top-12 md:top-24 left-8 md:left-24 z-20">
          <h2 className="text-4xl md:text-6xl text-foreground font-normal" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Curated Experiences
          </h2>
          <p className="text-muted-foreground mt-4 max-w-sm">
            Everything you need for a restorative escape, meticulously designed to harmonize with nature.
          </p>
        </div>
        
        <div 
          ref={trackRef}
          className="flex gap-6 md:gap-12 px-8 md:px-24 w-max items-center h-full pt-32 md:pt-40 pb-20 will-change-transform"
          style={{ 
            transform: `translate3d(-${scrollProgress * maxScroll}px, 0, 0)`,
          }}
        >
          {amenities.map((item, idx) => (
            <div 
              key={idx} 
              className="relative w-[280px] md:w-[400px] h-[400px] md:h-[550px] shrink-0 rounded-2xl md:rounded-3xl overflow-hidden group shadow-2xl cursor-pointer"
              onClick={() => setSelectedAmenity(item)}
            >
              <img 
                src={placeholderImage} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl md:text-4xl text-white mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>{item.title}</h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Animated Modal / Lightbox */}
      {selectedAmenity && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={() => setSelectedAmenity(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
          <div 
            className="relative w-full max-w-5xl h-[80vh] md:h-[85vh] bg-card rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-modal-enter border border-border/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Side */}
            <div className="w-full md:w-3/5 h-[40%] md:h-full relative overflow-hidden">
              <img 
                src={placeholderImage} 
                alt={selectedAmenity.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            {/* Content Side */}
            <div className="w-full md:w-2/5 p-8 md:p-14 flex flex-col justify-center relative bg-background">
              <button 
                className="absolute top-6 right-6 p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors z-10 text-foreground cursor-pointer"
                onClick={() => setSelectedAmenity(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
              <h3 className="text-4xl md:text-5xl text-foreground mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                {selectedAmenity.title}
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {selectedAmenity.desc}
              </p>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                Experience unparalleled luxury nestled deep within the living rainforest. Our world-class facilities blend seamless modern design with the breathtaking beauty of the natural world, providing the ultimate sanctuary for your soul.
              </p>
              <button className="mt-10 self-start liquid-glass rounded-full px-8 py-3.5 text-sm text-foreground hover:scale-[1.03] transition-transform cursor-pointer">
                Discover More
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
