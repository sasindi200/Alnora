import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TourStep {
  title: string;
  description: string;
  highlight?: string;
}

const tourSteps: TourStep[] = [
  {
    title: "Welcome to Alnora",
    description: "Alnora is a beautiful digital art gallery where you can explore masterpieces from centuries of European painting and share your own artwork with the community.",
    highlight: "hero",
  },
  {
    title: "Browse the Gallery Collection",
    description: "Explore our curated collection of classic artworks. Filter by era to discover paintings from the Renaissance, Baroque, Romantic, and other periods. Click on any artwork to see detailed information.",
    highlight: "gallery",
  },
  {
    title: "Discover Community Artworks",
    description: "Visit the Community Gallery to see artworks uploaded by other users. Vote for pieces you love by clicking the heart icon to support creators.",
    highlight: "community",
  },
  {
    title: "Upload Your Own Art",
    description: "Share your creative work with the world! Go to the Upload page, add your image, title, name, and description. Your artwork will appear in the Community Gallery for others to view and vote on.",
    highlight: "upload",
  },
  {
    title: "Create Your Profile",
    description: "Visit your Profile page to view all your uploads, track votes you've received, edit your name, and see your gallery stats. Your profile is your personal showcase!",
    highlight: "profile",
  },
  {
    title: "Rate & Rank Artworks",
    description: "When viewing individual artworks, you can rate them with stars. Your preferences help create personalized rankings of artworks based on the community's taste.",
    highlight: "rating",
  },
  {
    title: "You're All Set!",
    description: "You now know everything about Alnora! Start exploring the collection, upload your masterpiece, and engage with the art community. Enjoy your journey through the gallery!",
    highlight: "none",
  },
];

export default function GuidedTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('alnora-tour-seen');
    if (!hasSeenTour) {
      setIsOpen(true);
      localStorage.setItem('alnora-tour-seen', 'true');
    }
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = tourSteps[currentStep];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-primary font-semibold">
                Step {currentStep + 1} of {tourSteps.length}
              </p>
              <h2 className="text-2xl font-bold mt-1">{step.title}</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <p className="text-base text-muted-foreground mb-6 leading-relaxed">
            {step.description}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-1 mb-6">
            <div
              className="bg-primary h-full rounded-full transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / tourSteps.length) * 100}%`,
              }}
            />
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === tourSteps.length - 1 ? (
              <Button onClick={() => setIsOpen(false)} className="flex-1">
                Get Started
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Skip option */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip Tour
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
