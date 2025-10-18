// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"; // Import Outlet
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import ContentCalendar from "./pages/ContentCalendar";
import Analytics from "./pages/Analytics";
import Competitors from "./pages/Competitors";
import Inbox from "./pages/Inbox";
import Goals from "./pages/Goals";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { CommandPalette } from "./components/command/CommandPalette";
import { RootLayout } from "./components/layout/RootLayout";
import { useAuth } from "./context/AuthContext"; // Import useAuth


const queryClient = new QueryClient();

// Component to handle public routes (redirect if already logged in)
const PublicRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CommandPalette />
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoutes />}>
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             {/* Redirect root to login if not authenticated, else dashboard handled by PublicRoutes */}
             <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Protected routes wrapped by RootLayout */}
          {/* RootLayout now handles the authentication check */}
          <Route element={<RootLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/calendar" element={<ContentCalendar />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/competitors" element={<Competitors />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Fallback for unmatched routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;