import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, BarChart3, FileText, Users, Lightbulb, Calendar, Inbox, Target } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Lightbulb, label: "AI Insights", path: "/insights" },
  { icon: Calendar, label: "Calendar", path: "/calendar" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Competitors", path: "/competitors" },
  { icon: Inbox, label: "Inbox", path: "/inbox" },
  { icon: Target, label: "Goals", path: "/goals" },
  { icon: FileText, label: "Reports", path: "/reports" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex-col fixed left-0 top-0 hidden lg:flex">
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-xl md:text-2xl font-bold text-sidebar-primary">SocialMetrics</h1>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">Analytics Platform</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-sm font-medium text-sidebar-foreground">Upgrade to Pro</p>
          <p className="text-xs text-muted-foreground mt-1">Unlock advanced analytics</p>
          <button className="w-full mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
