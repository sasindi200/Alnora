import heroHallway from "@/assets/hero-hallway.png";
import { artworks } from "@/data/artworks";
import GoldFrame from "@/components/GoldFrame";
import Footer from "@/components/Footer";
import GuidedTour from "@/components/GuidedTour";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      <img
        src={heroHallway}
        alt="Grand gallery hallway with golden frames"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

      <div className="relative h-full container flex flex-col justify-end pb-16 md:pb-24">
        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold gold-text leading-[0.95] tracking-tight frame-drop-in frame-drop-in-1"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Walk Among
          <br />
          Masterpieces
        </h1>
        <p className="font-body text-lg md:text-xl text-cream-dark max-w-xl mt-6 frame-drop-in frame-drop-in-2" style={{ textWrap: "pretty" } as React.CSSProperties}>
          Step into the grand hallway of Alnora — where centuries of art hang
          in gilded splendor, waiting to share their stories with you.
        </p>
        <div className="flex gap-4 mt-8 frame-drop-in frame-drop-in-3">
          <Link
            to="/collection"
            className="inline-flex items-center justify-center px-8 py-3 font-body text-base tracking-wide bg-primary text-primary-foreground hover:bg-gold-light transition-colors duration-200 active:scale-[0.97]"
          >
            Enter the Gallery
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-8 py-3 font-body text-base tracking-wide gold-border-ornate text-primary hover:bg-primary/10 transition-colors duration-200 active:scale-[0.97]"
          >
            Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedWall() {
  const { ref, isVisible } = useScrollReveal();
  const featured = artworks.slice(0, 4);

  return (
    <section className="gallery-wall-bg py-20 md:py-32">
      <div className="container">
        <div
          ref={ref}
          className={`scroll-reveal ${isVisible ? "visible" : ""} text-center mb-16`}
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Featured Collection
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground" style={{ lineHeight: "1.1" }}>
            The Grand Hallway
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Each frame tells a story spanning five centuries of human expression — from
            the devotion of the Renaissance to the opulence of the Rococo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 max-w-5xl mx-auto">
          {featured.map((art, i) => (
            <GoldFrame key={art.id} artwork={art} index={i} />
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 font-body text-lg text-primary hover:text-gold-light transition-colors duration-200"
          >
            View Full Collection →
          </Link>
        </div>
      </div>
    </section>
  );
}

function EraSection() {
  const { ref, isVisible } = useScrollReveal();
  const eras = [
    { name: "High Renaissance", period: "1490–1530", desc: "Divine proportion meets human emotion" },
    { name: "Dutch Golden Age", period: "1615–1702", desc: "Light, shadow, and the poetry of the everyday" },
    { name: "Baroque", period: "1600–1750", desc: "Drama, grandeur, and the power of spectacle" },
    { name: "Rococo", period: "1720–1780", desc: "Elegance, fantasy, and the art of living" },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""}`}>
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3 text-center">
            Spanning Centuries
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center" style={{ lineHeight: "1.1" }}>
            Four Great Ages of Art
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {eras.map((era, i) => {
            const { ref: cardRef, isVisible: cardVisible } = useScrollReveal();
            return (
              <div
                key={era.name}
                ref={cardRef}
                className={`scroll-reveal ${cardVisible ? "visible" : ""} p-8 border border-border bg-card hover:border-primary/40 transition-colors duration-300`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="font-body text-xs uppercase tracking-[0.2em] text-primary">{era.period}</p>
                <h3 className="font-display text-xl font-semibold text-foreground mt-2" style={{ lineHeight: "1.2" }}>
                  {era.name}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-3">{era.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <main className="pt-0">
      <GuidedTour />
      <HeroSection />
      <FeaturedWall />
      <EraSection />
      <Footer />
    </main>
  );
}
