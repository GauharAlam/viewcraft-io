// src/components/command/CommandPalette.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  LayoutDashboard, 
  Lightbulb, 
  Calendar, 
  BarChart3, 
  Users, 
  FileText, 
  Settings,
  Inbox,
  Target
} from "lucide-react";
import { useCommand } from "@/context/CommandContext"; // Import the new hook

export function CommandPalette() {
  const { open, setOpen } = useCommand(); // Use state from context
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]); // Add dependencies

  const navigationItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Lightbulb, label: "AI Insights", path: "/insights" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Users, label: "Competitors", path: "/competitors" },
    { icon: FileText, label: "Reports", path: "/reports" },
    { icon: Inbox, label: "Inbox", path: "/inbox" },
    { icon: Target, label: "Goals", path: "/goals" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleSelect = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navigationItems.map((item) => (
            <CommandItem
              key={item.path}
              onSelect={() => handleSelect(item.path)}
              className="flex items-center gap-2"
            >
              <item.icon className="w-3 h-3" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => handleSelect("/settings")}>
            Connect X (Twitter)
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/settings")}>
            Connect Instagram
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("/settings")}>
            Connect LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}