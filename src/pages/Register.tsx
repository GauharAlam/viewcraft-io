// src/pages/Register.tsx
import React, { useState } from "react"; // Import React
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import apiClient from '@/services/api'; // Import API client
import { toast } from "@/components/ui/use-toast"; // Import toast for feedback

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [error, setError] = useState<string | null>(null); // Add error state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiClient.post('/auth/register', { name, email, password });

      if (response.status === 201) {
        toast({
          title: "Registration Successful!",
          description: "You can now log in.",
        });
        navigate("/login"); // Redirect to login after successful registration
      }
    } catch (err: any) {
      console.error("Registration failed:", err);
      const errorMessage = err.response?.data?.msg || "Registration failed. Please try again.";
      setError(errorMessage);
       toast({
         title: "Registration Failed",
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
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-muted-foreground">Start tracking your social media performance</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input fields remain the same */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
              required
              disabled={isLoading} // Disable input when loading
            />
          </div>

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
            <Label htmlFor="password">Password</Label>
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
            {isLoading ? "Creating Account..." : "Create account"}
          </Button>
           {/* ... (rest of the form content is the same) ... */}
           <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-primary hover:underline font-medium"
              disabled={isLoading}
            >
              Sign in
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}