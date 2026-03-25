import { LotusDecor } from "@/components/LotusDecor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Lock, LogIn } from "lucide-react";
import { useState } from "react";

const ADMIN_PASSWORD = "NAVAYATA@#2025";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("adminAuthenticated", "true");
        navigate({ to: "/admin/dashboard" });
      } else {
        setError("Incorrect password. Please try again.");
        setIsLoading(false);
      }
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, oklch(30% 0.13 18) 0%, oklch(38% 0.15 20) 50%, oklch(28% 0.1 25) 100%)",
      }}
    >
      {/* Corner ornaments */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/50" />
      <div className="fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-accent/50" />
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-accent/50" />
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/50" />

      <Card className="w-full max-w-md rounded-none border-accent/40 bg-background shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-2">
          <a href="/" className="inline-flex justify-center">
            <img
              src="/assets/file_00000000dabc7208bcffbe2575fd7f9b-019d23fb-97d7-7222-bf8a-7fe7d7362a59.png"
              alt="Navayata"
              className="h-14 w-auto object-contain"
            />
          </a>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-1">
              ✦ Restricted Access ✦
            </p>
            <CardTitle className="font-display text-3xl text-foreground">
              Admin Portal
            </CardTitle>
          </div>
          <LotusDecor className="w-40 h-auto mx-auto text-accent/40" />
        </CardHeader>
        <CardContent
          className="space-y-6 pt-2 pb-8 px-8"
          data-ocid="admin.login.panel"
        >
          <p className="text-center text-muted-foreground text-sm leading-relaxed">
            Enter your admin password to access the Navayata dashboard.
          </p>

          <div className="space-y-2">
            <Label htmlFor="admin-password" className="text-sm font-medium">
              <Lock className="w-3.5 h-3.5 inline mr-1.5 mb-0.5" />
              Admin Password
            </Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="Enter password"
                className="rounded-none border-accent/40 bg-background/50 pr-10"
                autoComplete="current-password"
                data-ocid="admin.input"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                data-ocid="admin.toggle"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {error && (
              <p
                className="text-sm text-destructive flex items-center gap-1.5 mt-1"
                data-ocid="admin.error_state"
              >
                {error}
              </p>
            )}
          </div>

          <Button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full rounded-none bg-secondary text-accent border border-accent/40 hover:bg-accent hover:text-accent-foreground gap-2 uppercase tracking-widest text-xs h-12 transition-all"
            data-ocid="admin.submit_button"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            {isLoading ? "Verifying..." : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
