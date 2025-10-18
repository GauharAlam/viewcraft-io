// src/pages/Login.tsx
import React, { useState } from "react"; // Import React
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import apiClient from '@/services/api'; // Import API client
import { useAuth } from '@/context/AuthContext'; // Import useAuth hook
import { toast } from "@/components/ui/use-toast"; // Import toast

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/login', { email, password });

      if (response.data.token) {
        login(response.data.token); // Call login from AuthContext
         toast({
           title: "Login Successful!",
           description: "Welcome back!",
         });
        navigate("/dashboard"); // Redirect to dashboard on successful login
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      const errorMessage = err.response?.data?.msg || "Login failed. Please check your credentials.";
      setError(errorMessage);
       toast({
         title: "Login Failed",
         description: errorMessage,
         variant: "destructive",
       });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8">
         {/* ... (rest of the card content is the same) ... */}
         <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">SocialMetrics</h1>
          <h2 className="text-2xl font-bold mb-2">Welcome back</h2>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields remain the same, but add disable state */}
           <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              required
              disabled={isLoading}
            />
          </div>

           {error && <p className="text-sm text-destructive">{error}</p>} {/* Display error */}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign in"}
          </Button>
           {/* ... (rest of the form content is the same) ... */}
           <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}