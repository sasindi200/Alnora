import { artworks } from "@/data/artworks";
import GoldFrame from "@/components/GoldFrame";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface UserUpload {
  id: number;
  filename: string;
  originalname: string;
  title: string;
  description: string;
  username: string;
  uploaded_at: string;
  votes: number;
}

const eras = ["All", "High Renaissance", "Dutch Golden Age", "Baroque", "Rococo", "Romantic"];

const UserUploadCard = ({ upload, queryClient }: { upload: UserUpload; queryClient: any }) => {
  const [voted, setVoted] = useState(false);

  const voteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/vote/${upload.id}`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to vote');
      }
      return response.json();
    },
    onSuccess: () => {
      setVoted(true);
      toast({ title: "Vote recorded!", description: "Thank you for your support." });
      queryClient.invalidateQueries({ queryKey: ['uploads'] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to record vote.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/uploads/${upload.id}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        throw new Error('Failed to delete upload');
      }
      return response.json();
    },
    onSuccess: async () => {
      toast({ title: "Deleted!", description: "Your artwork has been removed." });
      // Invalidate and immediately refetch
      await queryClient.invalidateQueries({ queryKey: ['uploads'] });
      await queryClient.refetchQueries({ queryKey: ['uploads'] });
    },
    onError: (error) => {
      console.error('Delete error:', error);
      toast({ title: "Error", description: "Failed to delete. Please try again.", variant: "destructive" });
    },
  });

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={`/uploads/${upload.filename}`}
          alt={upload.title}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <p className="text-xs text-primary font-semibold mb-1">by {upload.username}</p>
        <h3 className="font-semibold text-lg">{upload.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{upload.description}</p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm">Votes: {upload.votes}</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => voteMutation.mutate()}
              disabled={voted}
            >
              <Heart className={`w-4 h-4 ${voted ? 'fill-red-500' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Collection() {
  const [filter, setFilter] = useState("All");
  const { ref, isVisible } = useScrollReveal();
  const queryClient = useQueryClient();
  const filtered = filter === "All" ? artworks : artworks.filter((a) => a.era === filter);

  const { data: uploads } = useQuery({
    queryKey: ['uploads'],
    queryFn: () => fetch('/api/uploads').then(res => res.json()),
  });

  return (
    <main className="pt-20 md:pt-24">
      <section className="gallery-wall-bg py-16 md:py-24">
        <div className="container">
          <div ref={ref} className={`scroll-reveal ${isVisible ? "visible" : ""} text-center mb-12`}>
            <h1 className="font-display text-4xl md:text-6xl font-bold gold-text" style={{ lineHeight: "1.05" }}>
              The Collection
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mt-4">
              Browse our curated halls and community creations. Each masterpiece hangs in its gilded frame, waiting for your gaze.
            </p>
          </div>

          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="gallery">Gallery Collection</TabsTrigger>
              <TabsTrigger value="community">Community Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              {/* Era filters */}
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {eras.map((era) => (
                  <button
                    key={era}
                    onClick={() => setFilter(era)}
                    className={`px-5 py-2 font-body text-sm tracking-wide transition-all duration-200 active:scale-[0.96] ${
                      filter === era
                        ? "bg-primary text-primary-foreground"
                        : "gold-border-ornate text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 max-w-6xl mx-auto">
                {filtered.map((art, i) => (
                  <GoldFrame key={art.id} artwork={art} index={i} />
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="text-center font-body text-muted-foreground mt-12">
                  No works from this era in the current exhibition.
                </p>
              )}
            </TabsContent>

            <TabsContent value="community">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {uploads?.map((upload: UserUpload) => (
                  <UserUploadCard key={upload.id} upload={upload} queryClient={queryClient} />
                ))}
              </div>
              {(!uploads || uploads.length === 0) && (
                <p className="text-center font-body text-muted-foreground mt-12">
                  No community uploads yet. Be the first to share your artwork!
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <Footer />
    </main>
  );
}
