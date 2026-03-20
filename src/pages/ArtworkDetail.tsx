import { useParams, Link } from "react-router-dom";
import { artworks } from "@/data/artworks";
import Footer from "@/components/Footer";
import { ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function ArtworkDetail() {
  const { id } = useParams();
  const artwork = artworks.find((a) => a.id === id);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = async (rate: number) => {
    setRating(rate);
    try {
      await fetch('/api/preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artworkId: id, rating: rate, userId: 'anonymous' }),
      });
      setSubmitted(true);
      toast({ title: "Rating submitted!", description: "Thank you for your feedback." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to submit rating.", variant: "destructive" });
    }
  };

  if (!artwork) {
    return (
      <main className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground">Artwork Not Found</h1>
          <Link to="/collection" className="font-body text-primary mt-4 inline-block">
            ← Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 md:pt-24">
      <section className="gallery-wall-bg min-h-screen">
        <div className="container py-12 md:py-20">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 font-body text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={18} />
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Framed artwork */}
            <div className="flex justify-center">
              <div className="gold-frame-lg frame-drop-in frame-drop-in-1 max-w-lg">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details */}
            <div className="frame-drop-in frame-drop-in-3">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-primary">
                {artwork.era} · {artwork.year}
              </p>
              <h1
                className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3"
                style={{ lineHeight: "1.1", textWrap: "balance" } as React.CSSProperties}
              >
                {artwork.title}
              </h1>
              <p className="font-body text-xl text-cream-dark mt-2">{artwork.artist}</p>

              <div className="mt-8 border-t border-border pt-8">
                <p className="font-body text-base text-muted-foreground leading-relaxed" style={{ textWrap: "pretty" } as React.CSSProperties}>
                  {artwork.description}
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Medium</dt>
                  <dd className="font-body text-foreground mt-1">{artwork.medium}</dd>
                </div>
                <div>
                  <dt className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Period</dt>
                  <dd className="font-body text-foreground mt-1">{artwork.era}</dd>
                </div>
                <div>
                  <dt className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Year</dt>
                  <dd className="font-body text-foreground mt-1">{artwork.year}</dd>
                </div>
                <div>
                  <dt className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">Artist</dt>
                  <dd className="font-body text-foreground mt-1">{artwork.artist}</dd>
                </div>
              </dl>

              {/* Rating section */}
              <div className="mt-12 border-t border-border pt-8">
                <h3 className="font-body text-lg font-semibold mb-4">Rate this artwork</h3>
                {!submitted ? (
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRating(star)}
                        className="p-1"
                      >
                        <Star
                          className={`w-6 h-6 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Thank you for rating this artwork!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
