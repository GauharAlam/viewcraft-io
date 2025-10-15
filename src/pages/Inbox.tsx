import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  platform: "twitter" | "instagram" | "linkedin";
  author: string;
  avatar: string; // URL to avatar image
  initials: string; // e.g., "SJ" for Sarah Johnson
  content: string;
  timestamp: string;
  unread: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    platform: "twitter",
    author: "Sarah Johnson",
    avatar: "/placeholder.svg",
    initials: "SJ",
    content: "Love your latest post about social media trends! Can you share more tips?",
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: "2",
    platform: "instagram",
    author: "Mike Chen",
    avatar: "/placeholder.svg",
    initials: "MC",
    content: "Hey! I'd love to collaborate on a project. Are you open to partnerships?",
    timestamp: "5 hours ago",
    unread: true
  },
  {
    id: "3",
    platform: "linkedin",
    author: "Emily Rodriguez",
    avatar: "/placeholder.svg",
    initials: "ER",
    content: "Great insights in your recent article. Would love to connect!",
    timestamp: "1 day ago",
    unread: false
  }
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(mockMessages[0]);
  const [reply, setReply] = useState("");

  const getPlatformBadgeClass = (platform: string) => {
    switch(platform) {
      case "twitter": return "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-transparent";
      case "instagram": return "bg-[#E1306C] hover:bg-[#E1306C]/90 text-white border-transparent";
      case "linkedin": return "bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white border-transparent";
      default: return "";
    }
  };

  return (
    <main className="p-4 pt-20 md:p-8 md:pt-24">
      <h1 className="text-2xl md:text-[32px] font-bold mb-2">Unified Inbox</h1>
      <p className="text-muted-foreground mb-6 md:mb-8">
        Manage all your social media conversations in one place
      </p>

      {/* --- CORRECTED GRID LAYOUT --- */}
      {/* Changed to a 5-column grid for better proportion control */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-15rem)]">
        
        {/* Messages List - Now wider */}
        <Card className="lg:col-span-2 p-2 flex flex-col">
          <h3 className="font-semibold mb-2 p-2 flex items-center gap-2 text-base">
            <MessageSquare className="w-5 h-5" />
            Messages
          </h3>
          <div className="space-y-1 overflow-y-auto pr-1">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-colors flex items-start gap-3",
                  selectedMessage?.id === message.id ? "bg-accent" : "hover:bg-accent/50"
                )}
              >
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src={message.avatar} alt={message.author} />
                  <AvatarFallback>{message.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm truncate">{message.author}</p>
                    {message.unread && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2"></div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {message.content}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="default" className={cn("text-xs capitalize", getPlatformBadgeClass(message.platform))}>
                      {message.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversation View - Now narrower */}
        <Card className="lg:col-span-3 p-6 flex flex-col">
          {selectedMessage ? (
            <>
              {/* Header */}
              <div className="border-b border-border pb-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-11 h-11 border">
                    <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.author} />
                    <AvatarFallback>{selectedMessage.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{selectedMessage.author}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{selectedMessage.platform}</p>
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 space-y-6 overflow-y-auto pr-2 mb-4">
                <div className="flex items-end gap-3 justify-start">
                  <Avatar className="w-8 h-8 border self-start">
                    <AvatarImage src={selectedMessage.avatar} alt={selectedMessage.author} />
                    <AvatarFallback>{selectedMessage.initials}</AvatarFallback>
                  </Avatar>
                  <div className="max-w-xl">
                    <div className="bg-muted p-3 px-4 rounded-2xl rounded-bl-none">
                      <p className="text-sm leading-relaxed">{selectedMessage.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 px-1">{selectedMessage.timestamp}</p>
                  </div>
                </div>
              </div>

              {/* Reply Area */}
              <div className="mt-auto pt-4 border-t border-border">
                <div className="relative">
                  <Textarea
                    placeholder={`Reply to ${selectedMessage.author}...`}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    rows={3}
                    className="pr-14 py-3 px-4 resize-none"
                  />
                  <Button size="icon" className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9">
                    <Send className="w-4 h-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">Select a message</p>
                <p className="text-sm">Choose a conversation from the left to view and reply.</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}