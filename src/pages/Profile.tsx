import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

export default function Profile() {
  const [username, setUsername] = useState(() => {
    return localStorage.getItem('username') || '';
  });
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(username);

  const { data: allUploads } = useQuery({
    queryKey: ['uploads'],
    queryFn: () => fetch('/api/uploads').then(res => res.json()),
  });

  const userUploads = allUploads?.filter((upload: UserUpload) => upload.username === username) || [];

  const handleSaveName = () => {
    if (tempName.trim()) {
      localStorage.setItem('username', tempName);
      setUsername(tempName);
      setEditingName(false);
      toast({ title: "Profile updated!", description: "Your name has been changed." });
    }
  };

  return (
    <main className="pt-20 md:pt-24 min-h-screen">
      <section className="gallery-wall-bg py-16 md:py-24">
        <div className="container">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 font-body text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft size={18} />
            Back to Collection
          </Link>

          {/* Profile Header */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  {editingName ? (
                    <div className="flex gap-2">
                      <Input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        placeholder="Enter your name"
                      />
                      <Button onClick={handleSaveName}>Save</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingName(false);
                          setTempName(username);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                      <span className="text-lg font-semibold">{username || 'Anonymous'}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingName(true)}
                      >
                        Edit
                      </Button>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Profile Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground">Total Uploads</p>
                      <p className="text-2xl font-bold text-primary">{userUploads.length}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-md">
                      <p className="text-sm text-muted-foreground">Total Votes</p>
                      <p className="text-2xl font-bold text-primary">
                        {userUploads.reduce((sum, upload) => sum + upload.votes, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Uploads */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold gold-text mb-8">My Gallery</h2>

            {userUploads.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground mb-4">
                    You haven't uploaded any artworks yet.
                  </p>
                  <Link to="/upload">
                    <Button>Upload Your First Artwork</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userUploads.map((upload: UserUpload) => (
                  <Card key={upload.id} className="overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={`/uploads/${upload.filename}`}
                        alt={upload.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{upload.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{upload.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          ❤️ {upload.votes} {upload.votes === 1 ? 'vote' : 'votes'}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(upload.uploaded_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
