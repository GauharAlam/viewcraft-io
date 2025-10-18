import { Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Make sure Input is imported
import { NotificationDropdown } from "@/components/notifications/NotificationDropdown";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCommand } from "@/context/CommandContext";

export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { setOpen } = useCommand();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <SidebarTrigger className="lg:hidden" />
        
        {/* --- FIXED SEARCH BAR --- */}
        <div className="relative w-full max-w-sm items-center hidden sm:flex">
          <Search className="absolute left-1 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            readOnly
            onClick={() => setOpen(true)}
            placeholder="Search... (Cmd/Ctrl + K)"
            className="w-full rounded-lg bg-background pl-10 h-9 text-sm border-input cursor-pointer hover:bg-accent/50 transition-colors focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>

      </div>
      
      <div className="flex items-center gap-2 md:gap-3">
        <SidebarTrigger className="hidden lg:flex" />
        <NotificationDropdown />
        <div className="hidden sm:flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}