import { createFileRoute } from "@tanstack/react-router";
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

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroVideo.url}
      />
      <div className="absolute inset-0 z-[1] bg-black/30" />

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
                className={`text-sm transition-colors ${
                  link.active
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
  );
}
