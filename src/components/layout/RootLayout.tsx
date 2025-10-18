// src/components/layout/RootLayout.tsx

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { useAuth } from "@/context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
         <Skeleton className="h-12 w-12 rounded-full" />
         <p className="ml-4">Loading...</p>
      </div>
      );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      {/* --- THIS IS THE CHANGE --- */}
      <Sidebar collapsible="offcanvas">
        <AppSidebar />
      </Sidebar>
      {/* ------------------------- */}
      <SidebarInset>
        <Header />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}