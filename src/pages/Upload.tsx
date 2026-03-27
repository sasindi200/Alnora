import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const username =
    user?.email ??
    (typeof user?.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : "Anonymous");

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        headers: session?.access_token
          ? { Authorization: `Bearer ${session.access_token}` }
          : undefined,
      });
      if (!response.ok) throw new Error('Upload failed');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Upload successful!", description: "Your artwork has been uploaded." });
      setFile(null);
      setTitle("");
      setDescription("");
      queryClient.invalidateQueries({ queryKey: ['uploads'] });
    },
    onError: () => {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !username) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('username', username);

    uploadMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Upload Your Artwork</h1>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Share Your Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter artwork title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Uploading as</label>
                <Input value={username} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your artwork"
                  rows={3}
                />
              </div>
              <Button type="submit" disabled={uploadMutation.isPending} className="w-full">
                {uploadMutation.isPending ? "Uploading..." : "Upload Artwork"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
