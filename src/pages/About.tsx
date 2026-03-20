import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import heroHallway from "@/assets/hero-hallway.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function About() {
  const { ref: r1, isVisible: v1 } = useScrollReveal();
  const { ref: r2, isVisible: v2 } = useScrollReveal();
  const { ref: r3, isVisible: v3 } = useScrollReveal();

  const restartTour = () => {
    localStorage.removeItem("alnora-tour-seen");
    window.location.reload();
  };

  return (
    <main className="pt-20 md:pt-24">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
        <img src={heroHallway} alt="Gallery hallway" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70" />
        <div className="relative h-full container flex flex-col justify-center items-center text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold gold-text frame-drop-in frame-drop-in-1" style={{ lineHeight: "1.05" }}>
            About the Gallery
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-32">
        <div className="container max-w-3xl">
          <div ref={r1} className={`scroll-reveal ${v1 ? "visible" : ""}`}>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" style={{ lineHeight: "1.15" }}>
              A Digital Sanctuary for the Old Masters
            </h2>
            <div className="font-body text-base text-muted-foreground space-y-5 mt-8 leading-relaxed">
              <p>
                Alnora was born from a conviction that the world's greatest paintings
                deserve more than a dusty corner of the internet. We imagined a digital hallway
                where each work hangs in a gilded frame worthy of its stature — where visitors
                can wander as they would through the Uffizi or the Prado, discovering masterpieces
                at their own pace.
              </p>
              <p>
                Our collection spans five centuries of European painting, from the luminous
                devotional panels of the High Renaissance to the shimmering candlelit reveries
                of the Rococo. Each piece is presented with the reverence it deserves: historical
                context, artist biography, and rich detail that brings the paint and brushstrokes
                to life on your screen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="gallery-wall-bg py-20 md:py-32">
        <div className="container max-w-3xl">
          <div ref={r2} className={`scroll-reveal ${v2 ? "visible" : ""}`}>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-3">Our Mission</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground" style={{ lineHeight: "1.15" }}>
              Art for Everyone, Everywhere
            </h2>
            <p className="font-body text-base text-muted-foreground mt-8 leading-relaxed">
              Not everyone can travel to Florence or Amsterdam. Alnora brings the museum
              experience to anyone with a screen — no ticket required. We believe beauty is a
              public good, and that encountering a Rembrandt or a Tiepolo can change the way
              you see the world.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32">
        <div className="container text-center">
          <div ref={r3} className={`scroll-reveal ${v3 ? "visible" : ""}`}>
            <h2 className="font-display text-3xl md:text-4xl font-bold gold-text" style={{ lineHeight: "1.15" }}>
              Begin Your Journey
            </h2>
            <p className="font-body text-lg text-muted-foreground mt-4 max-w-md mx-auto">
              Step into the hallway. The golden frames are waiting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
              <Link
                to="/collection"
                className="inline-flex items-center justify-center px-8 py-3 font-body text-base tracking-wide bg-primary text-primary-foreground hover:bg-gold-light transition-colors duration-200 active:scale-[0.97]"
              >
                Enter the Gallery
              </Link>
              <Button
                onClick={restartTour}
                variant="outline"
                className="px-8 py-3 font-body text-base tracking-wide"
              >
                Restart Tour
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
