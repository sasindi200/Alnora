import art1 from "@/assets/art-1.png";
import art2 from "@/assets/art-2.png";
import art3 from "@/assets/art-3.png";
import art4 from "@/assets/art-4.png";
import art5 from "@/assets/art-5.png";
import art6 from "@/assets/art-6.png";
import art7 from "@/assets/art-7.png";
import art8 from "@/assets/art-8.png";

export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  era: string;
  medium: string;
  description: string;
  image: string;
  size: "small" | "medium" | "large" | "wide";
}

export const artworks: Artwork[] = [
  {
    id: "lady-in-garden",
    title: "Lady Amidst the Blossoms",
    artist: "Giovanni Bellardi",
    year: "1687",
    era: "Baroque",
    medium: "Oil on canvas",
    description: "A resplendent portrait capturing the grace of an aristocratic woman surrounded by the lush abundance of a formal garden. The golden light suffuses the scene with warmth, while the subject's confident gaze invites the viewer into her world of privilege and beauty.",
    image: art1,
    size: "large",
  },
  {
    id: "ruins-at-dusk",
    title: "Ruins at the Edge of Twilight",
    artist: "Claude de Montfort",
    year: "1742",
    era: "Romantic",
    medium: "Oil on canvas",
    description: "Ancient columns stand sentinel against a sky ablaze with the dying light of day. This masterful landscape evokes the passage of civilizations, the grandeur of Rome reduced to poetic fragments against nature's eternal canvas.",
    image: art2,
    size: "wide",
  },
  {
    id: "philosopher-by-candlelight",
    title: "The Philosopher's Last Letter",
    artist: "Hendrick van Straaten",
    year: "1654",
    era: "Dutch Golden Age",
    medium: "Oil on panel",
    description: "In the intimate glow of a single candle, a scholar commits his final thoughts to paper. The dramatic chiaroscuro reveals every line of a face shaped by decades of inquiry, while shadows guard the mysteries he has spent a lifetime pursuing.",
    image: art3,
    size: "large",
  },
  {
    id: "apotheosis",
    title: "The Apotheosis of Olympus",
    artist: "Antonio Celestini",
    year: "1731",
    era: "Rococo",
    medium: "Fresco transferred to canvas",
    description: "Gods and celestial beings spiral upward in a magnificent heavenly vortex. This breathtaking composition, originally adorning a palazzo ceiling, captures the boundless ambition of Baroque decorative painting at its most triumphant.",
    image: art4,
    size: "wide",
  },
  {
    id: "still-life-goblet",
    title: "Vanitas with Golden Chalice",
    artist: "Maria van Oosterwijck",
    year: "1668",
    era: "Dutch Golden Age",
    medium: "Oil on canvas",
    description: "Overripe fruits and flowers at the peak of their beauty surround an ornate golden goblet — symbols of earthly pleasure and its inevitable decay. The meticulous rendering of each petal and droplet reveals a painter of extraordinary patience and skill.",
    image: art5,
    size: "medium",
  },
  {
    id: "sea-battle",
    title: "The Engagement off Cape Dorado",
    artist: "Willem van de Vecht",
    year: "1703",
    era: "Baroque",
    medium: "Oil on canvas",
    description: "Warships clash amid towering waves as a storm breaks open to reveal a dramatic golden horizon. The raw power of nature mirrors the chaos of naval combat in this sweeping maritime masterpiece.",
    image: art6,
    size: "wide",
  },
  {
    id: "madonna-and-child",
    title: "Madonna della Luce",
    artist: "Sebastiano Raimondi",
    year: "1508",
    era: "High Renaissance",
    medium: "Tempera and oil on panel",
    description: "Bathed in ethereal golden light, the Virgin tenderly cradles the Christ child. The intimate warmth of the composition belies its theological gravity, achieving the rare synthesis of human tenderness and divine majesty that defines the finest Renaissance devotional art.",
    image: art7,
    size: "large",
  },
  {
    id: "grand-ball",
    title: "Fête Galante at the Palais Doré",
    artist: "Jean-Baptiste Leclair",
    year: "1774",
    era: "Rococo",
    medium: "Oil on canvas",
    description: "Beneath a constellation of crystal chandeliers, the aristocracy of old Europe whirls in an elegant dance. Silk and candlelight merge in a golden reverie that captures the final, glittering chapter of the ancien régime.",
    image: art8,
    size: "wide",
  },
];
