import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { label: "Gallery", path: "/" },
  { label: "Collection", path: "/collection" },
  { label: "Upload", path: "/upload" },
  { label: "Profile", path: "/profile" },
  { label: "About", path: "/about" },
];

export default function GalleryNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Logged out", description: "You have been signed out." });
      setOpen(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sign out failed";
      toast({ title: "Error", description: message, variant: "destructive" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-display text-xl md:text-2xl tracking-tight gold-text font-bold">
          Alnora
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-lg tracking-wide transition-colors duration-200 ${
                pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              className="font-body text-lg tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200"
              type="button"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className={`font-body text-lg tracking-wide transition-colors duration-200 ${
                pathname === "/auth"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground p-2 active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={`block font-body text-lg ${
                pathname === item.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user ? (
            <button
              onClick={handleSignOut}
              className="block font-body text-lg text-muted-foreground"
              type="button"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className={`block font-body text-lg ${
                pathname === "/auth" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
