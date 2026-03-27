import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export default function Auth() {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      setLastError(null);
      if (mode === "signin") {
        await signIn(email, password);
        toast({ title: "Logged in", description: "Welcome back to Alnora." });
        const nextPath =
          typeof location.state?.from === "string" ? location.state.from : "/";
        navigate(nextPath, { replace: true });
      } else {
        const result = await signUp(email, password);
        if (result.hasSession) {
          toast({ title: "Account created", description: "Welcome to Alnora." });
          navigate("/", { replace: true });
        } else {
          toast({
            title: "Check your email",
            description:
              "Your account was created. Confirm the email, then log in.",
          });
          setMode("signin");
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed";
      setLastError(message);
      toast({
        title: mode === "signin" ? "Login failed" : "Signup failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="pt-24 min-h-screen">
      <section className="gallery-wall-bg py-16">
        <div className="container max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>{mode === "signin" ? "Login" : "Create Account"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={mode === "signin" ? "default" : "outline"}
                    onClick={() => setMode("signin")}
                  >
                    I have account
                  </Button>
                  <Button
                    type="button"
                    variant={mode === "signup" ? "default" : "outline"}
                    onClick={() => setMode("signup")}
                  >
                    I am new
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    minLength={6}
                    required
                  />
                </div>
                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting
                    ? "Please wait..."
                    : mode === "signin"
                      ? "Login"
                      : "Create Account"}
                </Button>
              </form>

              <button
                className="mt-4 text-sm text-primary hover:underline"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                type="button"
              >
                {mode === "signin"
                  ? "New here? Switch to sign up"
                  : "Already registered? Switch to login"}
              </button>

              {lastError && (
                <p className="mt-3 text-sm text-destructive">
                  {lastError.includes("Invalid login credentials")
                    ? "Invalid login credentials. Use an existing account or sign up first."
                    : lastError.includes("Email not confirmed")
                      ? "Email not confirmed. Open your inbox and verify your account first."
                      : lastError}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
