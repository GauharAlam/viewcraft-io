// src/components/notifications/NotificationDropdown.tsx

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface Notification {
  id: string;
  type: "positive" | "negative" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "positive",
    title: "High Engagement Alert",
    message: "Your latest Instagram post is getting 3x more comments than usual!",
    timestamp: "5 minutes ago",
    read: false
  },
  {
    id: "2",
    type: "negative",
    title: "Follower Drop",
    message: "Unusual drop in follower count on X in the last 24 hours.",
    timestamp: "1 hour ago",
    read: false
  },
  {
    id: "3",
    type: "alert",
    title: "Goal Progress",
    message: "You're 75% towards your follower goal for this month!",
    timestamp: "2 hours ago",
    read: true
  }
];

export function NotificationDropdown() {
  const [notifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch(type) {
      case "positive": return <TrendingUp className="w-4 h-4 text-success" />;
      case "negative": return <TrendingDown className="w-4 h-4 text-destructive" />;
      case "alert": return <AlertTriangle className="w-4 h-4 text-warning" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-3 py-2 border-b border-border">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
          )}
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="group flex items-start gap-3 p-3 cursor-pointer">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground group-data-[highlighted]:text-accent-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground group-data-[highlighted]:text-accent-foreground">
                  {notification.timestamp}
                </p>
              </div>
              {!notification.read && (
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
              )}
            </DropdownMenuItem>
          ))}
        </div>
        
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="ghost" className="w-full text-sm">
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}