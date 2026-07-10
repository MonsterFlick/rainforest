import { createFileRoute } from "@tanstack/react-router";
import { useRef, useEffect, useState } from "react";
import heroVideo from "@/assets/rainforest-hero.mp4.asset.json";
import { AudioPlayer } from "../components/AudioPlayer";
import { Magnetic } from "../components/Magnetic";

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

const amenities = [
  { 
    title: "Turf", 
    subtitle: "The Canopy Arena",
    desc: "A pristine playing field carved into the jungle.",
    fullDesc: "Surrounded by ancient ferns and cloud forest trees, our professional-grade hybrid turf offers a unique playing experience. Perfect for yoga, friendly sport matches, or general movement, it merges athletic precision with the breathtaking serenity of raw nature.",
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&w=1200&h=800&q=80",
    year: "2026",
    location: "Sanctuary Highlands",
    altitude: "980m Elevation",
    vibe: "Mist & Ferns",
    gallery: [
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&h=400&q=80"
    ]
  },
  { 
    title: "Pool", 
    subtitle: "The Emerald Abyss",
    desc: "Infinity edges blending into the canopy.",
    fullDesc: "Suspended above the jungle canopy, our heated salt-water infinity pool mimics the emerald waters of hidden rainforest cenotes. Wash away the world as mist drifts across the water, with views stretching out to the mountain horizon.",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&h=800&q=80",
    year: "2026",
    location: "North Canopy Ridge",
    altitude: "1050m Elevation",
    vibe: "Thermal Mist",
    gallery: [
      "https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80"
    ]
  },
  { 
    title: "Food", 
    subtitle: "The Hearth & Soil",
    desc: "Farm-to-table dining, grown steps away.",
    fullDesc: "Dine on organic ingredients harvested daily from our greenhouse and nearby permaculture farms. Curated by top chefs, every dish is an exploration of indigenous spices and seasonal forest fruits, served on open-air platforms under the stars.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&h=800&q=80",
    year: "2026",
    location: "Greenhouse Kitchen",
    altitude: "920m Elevation",
    vibe: "Hearth & Smoke",
    gallery: [
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&h=400&q=80"
    ]
  },
  { 
    title: "Rooms", 
    subtitle: "The Glass Treehouses",
    desc: "Sanctuaries of glass and native wood.",
    fullDesc: "Designed with architectural minimalism, our private cabins feature full-height glass walls that make the forest your living wallpaper. Crafted from sustainably harvested local teak and volcanic stone, they offer absolute privacy and deep quiet.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80",
    year: "2026",
    location: "Whispering Woods",
    altitude: "960m Elevation",
    vibe: "Teak & Moss",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&h=400&q=80"
    ]
  },
  { 
    title: "Lawn", 
    subtitle: "The Hearth Meadow",
    desc: "Open green spaces for evening bonfires.",
    fullDesc: "A wide, manicured meadow bordered by wild orchids. As the evening chill rolls in, gather around our hand-carved volcanic rock fire pits. Swap stories under a clear sky, enjoying artisanal hot cacao and the symphony of night-blooming jasmine.",
    image: "https://images.unsplash.com/photo-1533577116850-9cc662ad4a17?auto=format&fit=crop&w=1200&h=800&q=80",
    year: "2026",
    location: "Sunset Valley",
    altitude: "890m Elevation",
    vibe: "Jasmine & Embers",
    gallery: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?auto=format&fit=crop&w=600&h=400&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&h=400&q=80"
    ]
  },
];

function Index() {
  const serif = { fontFamily: "'Instrument Serif', serif" };
  const videoRef = useRef<HTMLVideoElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(-1);
  const [scrollProgress, setScrollProgress] = useState(0);

  const bgColors = ["#eae7e1", "#dee3d7", "#d6e2e2", "#e8ded4", "#ebdccf", "#ded4d4", "#0f110f"];
  const currentBg = activeIndex === -1 ? bgColors[0] : bgColors[activeIndex + 1] || bgColors[bgColors.length - 1];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setStartTime = () => {
      if (video.currentTime < 5) video.currentTime = 5;
    };

    video.addEventListener("loadedmetadata", setStartTime);
    video.addEventListener("loadeddata", setStartTime);
    video.addEventListener("canplay", setStartTime);
    video.addEventListener("play", setStartTime);

    const interval = setInterval(() => {
      if (video.currentTime > 0 && video.currentTime < 5) {
        video.currentTime = 5;
        clearInterval(interval);
      }
    }, 100);

    const handleTimeUpdate = () => {
      if (video.currentTime < 0.5) video.currentTime = 5;
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", setStartTime);
      video.removeEventListener("loadeddata", setStartTime);
      video.removeEventListener("canplay", setStartTime);
      video.removeEventListener("play", setStartTime);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      clearInterval(interval);
    };
  }, []);

  // Observe Hero visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(-1);
        }
      },
      { threshold: 0.4 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMainScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const progress = target.scrollTop / target.clientHeight;
    setScrollProgress(progress);
    
    const nearestIndex = Math.round(progress) - 1;
    setActiveIndex(nearestIndex);
  };

  const renderSplitWord = (word: string, delayMs: number) => (
    <span key={word + delayMs} className="inline-block overflow-hidden mr-[0.18em] last:mr-0 align-bottom">
      <span className="animate-word-rise" style={{ animationDelay: `${delayMs}ms` }}>{word}</span>
    </span>
  );

  return (
    <main 
      ref={mainRef}
      onScroll={handleMainScroll}
      className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth relative select-none"
      style={{ 
        backgroundColor: currentBg, 
        transition: "background-color 1.2s cubic-bezier(0.25, 1, 0.5, 1)" 
      }}
    >
      {/* 1. Hero Landing Block */}
      <section 
        ref={heroRef}
        className="relative h-screen w-full overflow-hidden bg-background snap-start"
      >
        <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" src={heroVideo.url} />
        <div className="absolute inset-0 z-[1] bg-black/50" />

        <div className="relative z-10 flex flex-col min-h-screen text-[#faf9f6]">
          <nav className="flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto w-full">
            <a href="/" className="text-3xl tracking-tight text-[#faf9f6]" style={serif}>
              Rainforest Farms<sup className="text-xs">®</sup>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="text-sm text-[#faf9f6]/60 hover:text-[#faf9f6]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <AudioPlayer />
              <Magnetic>
                <button className="liquid-glass shimmer-hover rounded-full px-6 py-2.5 text-sm cursor-pointer">
                  Book a Stay
                </button>
              </Magnetic>
            </div>
          </nav>

          <section className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6">
            <h1
              className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal"
              style={serif}
            >
              {renderSplitWord("Where", 100)}{" "}
              {renderSplitWord("the", 180)}{" "}
              {renderSplitWord("forest", 260)}{" "}
              <em className="not-italic text-[#faf9f6]/70">
                {renderSplitWord("breathes", 340)}
              </em>{" "}
              {renderSplitWord("and", 420)}{" "}
              {renderSplitWord("time", 500)}{" "}
              <em className="not-italic text-[#faf9f6]/70">
                {renderSplitWord("slows.", 580)}
              </em>
            </h1>

            <p className="text-[#faf9f6]/80 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
              Rainforest Farms is a quiet retreat carved into living jungle.
            </p>

            <Magnetic>
              <button className="liquid-glass shimmer-hover rounded-full px-14 py-5 text-base mt-12 cursor-pointer">
                Begin Your Escape
              </button>
            </Magnetic>
          </section>
        </div>
      </section>

      {/* 2. Experiences Scroll snapping content */}
      <AmenitiesSection 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
        mainRef={mainRef}
      />
    </main>
  );
}

interface AmenitiesSectionProps {
  activeIndex: number;
  setActiveIndex: (idx: number) => void;
  mainRef: React.RefObject<HTMLElement | null>;
}

function AmenitiesSection({ activeIndex, setActiveIndex, mainRef }: AmenitiesSectionProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<typeof amenities[number] | null>(null);

  const currentIndex = selectedAmenity ? amenities.findIndex(a => a.title === selectedAmenity.title) : -1;

  const handlePrev = (e: React.MouseEvent) => { e.stopPropagation(); if (currentIndex !== -1) setSelectedAmenity(amenities[(currentIndex - 1 + amenities.length) % amenities.length]); };
  const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); if (currentIndex !== -1) setSelectedAmenity(amenities[(currentIndex + 1) % amenities.length]); };

  const scrollToSection = (idx: number) => {
    if (mainRef.current) {
      const slides = mainRef.current.querySelectorAll(".amenity-slide");
      if (slides[idx]) slides[idx].scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="pointer-events-none">
        {/* Magazine Style Counter (Desktop only) */}
        <div className={`fixed top-12 right-8 md:top-20 md:right-24 z-30 text-lg md:text-xl tracking-wider text-foreground/45 font-light flex items-center gap-2 transition-all duration-700 hidden lg:flex ${activeIndex >= 0 && activeIndex < 5 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
          <span className="text-foreground font-medium">{(activeIndex + 1).toString().padStart(2, '0')}</span>
          <span className="h-[1px] w-6 bg-foreground/20" />
          <span>{amenities.length.toString().padStart(2, '0')}</span>
        </div>
        {/* Progress Dots (Desktop only) */}
        <div className={`fixed right-8 md:right-12 top-[50vh] -translate-y-1/2 z-30 flex flex-col items-center gap-4 transition-all duration-700 pointer-events-auto hidden lg:flex ${activeIndex >= 0 && activeIndex < 5 ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
          {amenities.map((_, idx) => (
            <button key={idx} onClick={() => scrollToSection(idx)} className="group relative flex items-center justify-center w-6 h-6 focus:outline-none cursor-pointer">
              <span className={`absolute rounded-full transition-all duration-500 ease-out ${idx === activeIndex ? "w-2.5 h-2.5 bg-[#181c19] ring-4 ring-[#181c19]/10 scale-100" : "w-1.5 h-1.5 bg-[#181c19]/35 group-hover:bg-[#181c19] group-hover:scale-125"}`} />
            </button>
          ))}
        </div>
      </div>

      {amenities.map((item, idx) => (
        <AmenitySlide key={idx} item={item} idx={idx} isActive={idx === activeIndex} setActive={setActiveIndex} onExplore={setSelectedAmenity} />
      ))}

      {/* Cinematic Footer Slide */}
      <FooterSlide isActive={activeIndex === 5} setActive={setActiveIndex} />

      {/* Full-Screen Immersive Takeover Lightbox */}
      {selectedAmenity && (
        <div 
          className="fixed inset-0 z-50 flex flex-col lg:flex-row bg-[#f4f1ea] select-none animate-fade-in"
          onClick={() => setSelectedAmenity(null)}
        >
          {/* Left Panel: Full-Bleed Image with Ken Burns */}
          <div className="w-full lg:w-1/2 h-[40vh] lg:h-full relative overflow-hidden bg-neutral-900 animate-slide-left-panel">
            <img 
              key={selectedAmenity.title}
              src={selectedAmenity.image} 
              alt={selectedAmenity.title} 
              className="w-full h-full object-cover animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Panel: Content Info Scroll Canvas */}
          <div 
            className="w-full lg:w-1/2 h-[60vh] lg:h-full overflow-y-auto bg-[#f4f1ea] px-8 py-10 md:p-20 relative flex flex-col justify-between animate-slide-right-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 lg:top-12 lg:right-12 p-3 rounded-full bg-[#eae7e1]/80 hover:bg-[#eae7e1] text-[#181c19] transition-all duration-300 shadow-md border border-neutral-200/50 cursor-pointer active:scale-95 z-40"
              onClick={() => setSelectedAmenity(null)}
              data-cursor="close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            {/* Info details */}
            <div className="flex-1 max-w-lg mt-4 lg:mt-12">
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] font-semibold text-emerald-800/80 mb-5">
                <span>{selectedAmenity.location}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-800/40" />
                <span>{selectedAmenity.altitude}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-800/40" />
                <span>{selectedAmenity.vibe}</span>
              </div>

              <p className="font-['Pinyon_Script'] text-3xl md:text-4xl text-emerald-800 leading-none">
                {selectedAmenity.subtitle}
              </p>

              <h3 className="text-3xl md:text-5xl font-light tracking-tight mt-1 mb-6 text-[#181c19]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {selectedAmenity.title}
              </h3>

              <p className="text-sm md:text-base leading-relaxed text-[#3c3e3a] mb-10 font-normal">
                {selectedAmenity.fullDesc}
              </p>

              {/* Drag Gallery Area */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.25em] font-bold text-foreground/45 mb-4">
                  Experience Details (Drag to Explore)
                </h4>
                <DetailDragGallery images={selectedAmenity.gallery} />
              </div>
            </div>

            {/* Takeover Footer Controls */}
            <div className="flex justify-between items-center pt-6 border-t border-neutral-300/30 text-xs text-foreground/45 mt-10 font-medium font-body">
              <span>ESTABLISHED 2026</span>
              <div className="flex items-center gap-4">
                <button onClick={handlePrev} className="p-2 hover:text-emerald-800 transition-colors cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m15 18-6-6 6-6"/></svg></button>
                <span className="font-mono text-[10px] tracking-[0.15em]">{(currentIndex + 1).toString().padStart(2, '0')} / {amenities.length.toString().padStart(2, '0')}</span>
                <button onClick={handleNext} className="p-2 hover:text-emerald-800 transition-colors cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

interface DetailDragGalleryProps {
  images: string[];
}

function DetailDragGallery({ images }: DetailDragGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.8;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <div 
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      className="flex gap-4 overflow-x-auto select-none no-scrollbar cursor-grab active:cursor-grabbing pb-2 pr-8 md:pr-16"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {images.map((img, index) => (
        <div 
          key={index}
          className="relative w-40 h-28 md:w-48 md:h-32 rounded-xl overflow-hidden shrink-0 shadow-md group/thumb border border-neutral-200/20"
        >
          <img 
            src={img} 
            alt={`Detail thumbnail ${index + 1}`} 
            className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500 pointer-events-none"
          />
        </div>
      ))}
      {/* Scroll track trailing spacer */}
      <div className="w-8 shrink-0 h-1" />
    </div>
  );
}

interface AmenitySlideProps {
  item: typeof amenities[number];
  idx: number;
  isActive: boolean;
  setActive: (idx: number) => void;
  onExplore: (item: typeof amenities[number]) => void;
}

function AmenitySlide({ item, idx, isActive, setActive, onExplore }: AmenitySlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setActive(idx); setInView(true); } else setInView(false); }, { threshold: 0.5 });
    if (slideRef.current) observer.observe(slideRef.current);
    return () => observer.disconnect();
  }, [idx, setActive]);

  return (
    <section ref={slideRef} onMouseMove={(e) => { if (!slideRef.current) return; const { left, top, width, height } = slideRef.current.getBoundingClientRect(); setMousePos({ x: (e.clientX - left) / width - 0.5, y: (e.clientY - top) / height - 0.5 }); }} className="amenity-slide snap-start w-full h-screen relative flex items-center justify-center overflow-hidden px-8 md:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl items-center pt-24 pb-12 relative">
        {/* Mobile Section Title (First slide only) */}
        {idx === 0 && (
          <div className="block lg:hidden w-full absolute top-8 left-0">
            <h2 className="text-2xl text-foreground font-normal tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>Curated Experiences</h2>
          </div>
        )}

        {/* Content Column (Pushed to left on desktop, bottom on mobile) */}
        <div className="lg:col-span-5 lg:order-1 flex flex-col justify-center text-foreground z-10 mt-8 lg:mt-0">
          <div className={`text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800/80 mb-3 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{item.location}</div>
          <p className={`font-['Pinyon_Script'] text-4xl text-emerald-800/90 leading-none transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>{item.subtitle}</p>
          <h3 className="text-4xl md:text-6xl font-light tracking-tight mt-1 mb-6" style={{ fontFamily: "'Playfair Display', serif", opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s, transform 1s" }}>{item.title}</h3>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-md mb-8" style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s, transform 1s" }}>{item.fullDesc}</p>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s, transform 1s" }}>
            <Magnetic><button onClick={() => onExplore(item)} className="group flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold border-b border-foreground/35 pb-2 hover:border-emerald-800 transition-all"><span>Explore Experience</span><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7 7 7-7-7-7"/></svg></button></Magnetic>
          </div>
        </div>

        {/* Image Column (Pushed to right on desktop, top on mobile) */}
        <div className="lg:col-span-7 lg:order-2 relative w-full h-[40vh] lg:h-[65vh] rounded-3xl overflow-hidden shadow-2xl cursor-pointer" onClick={() => onExplore(item)}>
          <div className={`absolute inset-0 z-10 bg-[#eae7e1] transition-transform duration-[1200ms] ${inView ? "translate-y-full" : "translate-y-0"}`} />
          <img 
            src={item.image} 
            className="absolute w-full h-[120%] object-cover transition-transform" 
            style={{ 
              transform: `translate3d(0, ${mousePos.y * -20}px, 0) scale(${inView ? 1.08 : 1})`, 
              top: "-10%", 
              transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" 
            }} 
          />
        </div>
      </div>
    </section>
  );
}

interface FooterSlideProps {
  isActive: boolean;
  setActive: (idx: number) => void;
}

function FooterSlide({ isActive, setActive }: FooterSlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setActive(5); setInView(true); } else setInView(false); }, { threshold: 0.5 });
    if (slideRef.current) observer.observe(slideRef.current);
    return () => observer.disconnect();
  }, [setActive]);

  return (
    <section 
      ref={slideRef}
      className={`snap-start w-full h-screen relative flex flex-col justify-between overflow-hidden px-8 md:px-24 transition-colors duration-1000 ${
        isActive ? "bg-[#0f110f]" : "bg-background"
      }`}
    >
      <div className="h-20" />
      <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto flex-1 select-none">
        <p className="font-['Pinyon_Script'] text-3xl md:text-5xl text-emerald-800 transition-all duration-1000 delay-100" style={{ opacity: inView ? 0.9 : 0, transform: inView ? "translate3d(0,0,0)" : "translate3d(0,20px,0)" }}>Your escape awaits</p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#faf9f6] mt-4 mb-10 transition-all duration-1000 delay-300" style={{ fontFamily: "'Playfair Display', serif", opacity: inView ? 1 : 0, transform: inView ? "translate3d(0,0,0)" : "translate3d(0,30px,0)" }}>Let the forest breathe, and time slow down.</h2>
        <div className="transition-all duration-1000 delay-500" style={{ opacity: inView ? 1 : 0, transform: inView ? "translate3d(0,0,0)" : "translate3d(0,30px,0)" }}>
          <Magnetic>
            <button className="relative w-44 h-44 rounded-full border border-[#faf9f6]/25 hover:border-emerald-800 text-[#faf9f6] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-500 bg-[#faf9f6]/5 backdrop-blur-sm cursor-pointer shadow-lg group">
              <div className="absolute inset-0 rounded-full bg-emerald-800 scale-0 group-hover:scale-100 transition-transform duration-500 z-0" />
              <span className="relative z-10 text-xs uppercase tracking-[0.25em] font-semibold font-body group-hover:text-[#faf9f6]">Book a Stay</span>
            </button>
          </Magnetic>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 pb-12 border-t border-[#faf9f6]/10 text-xs text-[#faf9f6]/45 font-medium transition-all duration-1000 delay-700 w-full max-w-7xl mx-auto" style={{ opacity: inView ? 1 : 0, transform: inView ? "translate3d(0,0,0)" : "translate3d(0,20px,0)" }}>
        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="text-[#faf9f6]/60">LOCATION</span>
          <span className="font-light">Sanctuary Highlands, Costa Rica</span>
          <span className="font-light text-[10px] opacity-75">10° 25' N, 84° 40' W</span>
        </div>
        <div className="md:col-span-4 flex flex-col gap-2">
          <span className="text-[#faf9f6]/60">INQUIRIES</span>
          <span className="font-light">escape@rainforestfarms.co</span>
          <span className="font-light">+1 (800) 555-0199</span>
        </div>
        <div className="md:col-span-4 flex flex-col md:items-end justify-between min-h-[50px]">
          <span className="font-['Pinyon_Script'] text-2xl text-emerald-800/80 leading-none">Rainforest Farms</span>
          <span className="text-[10px] tracking-wider uppercase font-light">© 2026 RAINFOREST FARMS. ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
}
