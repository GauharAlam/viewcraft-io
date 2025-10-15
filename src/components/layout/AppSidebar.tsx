import { NavLink } from "react-router-dom";
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, Settings, BarChart3, FileText, Users, Lightbulb, Calendar, Inbox, Target 
} from "lucide-react";
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
];

const settingsNav = { icon: Settings, label: "Settings", path: "/settings" };

export function AppSidebar() {
  const { state } = useSidebar();

  return (
    <>
      <SidebarHeader>
        <h1 className={cn(
          "text-xl md:text-2xl font-bold text-sidebar-primary transition-opacity duration-200",
          state === "collapsed" && "opacity-0"
        )}>
          SocialMetrics
        </h1>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
             <NavLink to={settingsNav.path}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={settingsNav.label}
                  >
                    <settingsNav.icon />
                    <span>{settingsNav.label}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}