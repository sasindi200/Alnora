import { Link } from "react-router-dom";
import type { Artwork } from "@/data/artworks";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface GoldFrameProps {
  artwork: Artwork;
  index?: number;
  className?: string;
  hero?: boolean;
}

export default function GoldFrame({ artwork, index = 0, className = "", hero = false }: GoldFrameProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const delayClass = `frame-drop-in-${(index % 8) + 1}`;

  return (
    <div
      ref={ref}
      className={`${isVisible ? `frame-drop-in ${delayClass}` : "opacity-0"} ${className}`}
    >
      <Link to={`/artwork/${artwork.id}`} className="group block">
        <div className={`${hero ? "gold-frame-lg" : "gold-frame"} frame-sway overflow-hidden`}>
          <img
            src={artwork.image}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="mt-6 text-center px-2">
          <h3 className="font-display text-lg md:text-xl text-foreground group-hover:text-primary transition-colors duration-200">
            {artwork.title}
          </h3>
          <p className="font-body text-sm text-muted-foreground mt-1">
            {artwork.artist}, {artwork.year}
          </p>
        </div>
      </Link>
    </div>
  );
}
