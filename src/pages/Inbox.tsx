import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  id: string;
  platform: "twitter" | "instagram" | "linkedin";
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    platform: "twitter",
    author: "Sarah Johnson",
    avatar: "",
    content: "Love your latest post about social media trends! Can you share more tips?",
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: "2",
    platform: "instagram",
    author: "Mike Chen",
    avatar: "",
    content: "Hey! I'd love to collaborate on a project. Are you open to partnerships?",
    timestamp: "5 hours ago",
    unread: true
  },
  {
    id: "3",
    platform: "linkedin",
    author: "Emily Rodriguez",
    avatar: "",
    content: "Great insights in your recent article. Would love to connect!",
    timestamp: "1 day ago",
    unread: false
  }
];

export default function Inbox() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(mockMessages[0]);
  const [reply, setReply] = useState("");

  const getPlatformColor = (platform: string) => {
    switch(platform) {
      case "twitter": return "bg-blue-500";
      case "instagram": return "bg-pink-500";
      case "linkedin": return "bg-blue-700";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-4 md:p-8">
          <h1 className="text-2xl md:text-[32px] font-bold mb-2">Unified Inbox</h1>
          <p className="text-muted-foreground mb-6 md:mb-8">
            Manage all your social media conversations in one place
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <Card className="lg:col-span-1 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Messages
              </h3>
              <div className="space-y-2">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMessage?.id === message.id
                        ? "bg-accent"
                        : "hover:bg-accent/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>{message.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm truncate">{message.author}</p>
                          {message.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {message.content}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className={`${getPlatformColor(message.platform)} text-white text-xs`}>
                            {message.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Conversation View */}
            <Card className="lg:col-span-2 p-6">
              {selectedMessage ? (
                <>
                  <div className="border-b border-border pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={selectedMessage.avatar} />
                        <AvatarFallback>{selectedMessage.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedMessage.author}</h3>
                        <Badge variant="outline" className={`${getPlatformColor(selectedMessage.platform)} text-white text-xs`}>
                          {selectedMessage.platform}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-accent p-4 rounded-lg">
                      <p className="text-sm mb-2">{selectedMessage.content}</p>
                      <p className="text-xs text-muted-foreground">{selectedMessage.timestamp}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      rows={4}
                    />
                    <div className="flex justify-end">
                      <Button>
                        <Send className="w-4 h-4 mr-2" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Select a message to view conversation
                </div>
              )}
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
