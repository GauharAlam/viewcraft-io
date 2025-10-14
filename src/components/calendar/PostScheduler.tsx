import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, Hash } from "lucide-react";
import { format } from "date-fns";

interface ScheduledPost {
  id: string;
  platform: string;
  content: string;
  scheduledDate: Date;
  scheduledTime: string;
  hashtags: string[];
  status: "scheduled" | "published" | "draft";
}

const mockPosts: ScheduledPost[] = [
  {
    id: "1",
    platform: "twitter",
    content: "Excited to announce our new feature! 🚀",
    scheduledDate: new Date(2025, 0, 15),
    scheduledTime: "14:00",
    hashtags: ["#ProductLaunch", "#SocialMedia"],
    status: "scheduled",
  },
  {
    id: "2",
    platform: "instagram",
    content: "Behind the scenes of our team meeting 📸",
    scheduledDate: new Date(2025, 0, 16),
    scheduledTime: "10:00",
    hashtags: ["#TeamWork", "#BehindTheScenes"],
    status: "scheduled",
  },
];

export function PostScheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [posts, setPosts] = useState<ScheduledPost[]>(mockPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    platform: "twitter",
    content: "",
    time: "12:00",
  });
  const [suggestedHashtags] = useState(["#Marketing", "#SocialMedia", "#Content", "#Engagement"]);

  const postsForSelectedDate = posts.filter(
    (post) =>
      selectedDate &&
      post.scheduledDate.toDateString() === selectedDate.toDateString()
  );

  const handleSchedulePost = () => {
    if (!selectedDate || !newPost.content.trim()) return;

    const post: ScheduledPost = {
      id: Date.now().toString(),
      platform: newPost.platform,
      content: newPost.content,
      scheduledDate: selectedDate,
      scheduledTime: newPost.time,
      hashtags: [],
      status: "scheduled",
    };

    setPosts([...posts, post]);
    setNewPost({ platform: "twitter", content: "", time: "12:00" });
    setIsDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Section */}
      <Card className="p-6 lg:col-span-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Schedule</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Schedule New Post</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select value={newPost.platform} onValueChange={(v) => setNewPost({ ...newPost, platform: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">X (Twitter)</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Post Content</Label>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={6}
                  />
                </div>

                {/* AI Hashtag Suggestions */}
                {newPost.content.length > 10 && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Hash className="w-4 h-4" />
                      Suggested Hashtags (AI-Powered)
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {suggestedHashtags.map((tag) => (
                        <Button
                          key={tag}
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setNewPost({ ...newPost, content: newPost.content + " " + tag })
                          }
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                      onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={newPost.time}
                      onChange={(e) => setNewPost({ ...newPost, time: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleSchedulePost} className="w-full">
                  Schedule Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />

        <div className="mt-4 p-3 bg-muted/50 rounded-lg text-sm">
          <p className="font-medium mb-1">Quick Stats</p>
          <p className="text-muted-foreground">
            {posts.filter((p) => p.status === "scheduled").length} posts scheduled
          </p>
        </div>
      </Card>

      {/* Scheduled Posts Section */}
      <Card className="p-6 lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">
          Posts for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "Select a date"}
        </h3>

        {postsForSelectedDate.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No posts scheduled for this date</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsDialogOpen(true)}>
              Schedule a Post
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {postsForSelectedDate.map((post) => (
              <div key={post.id} className="p-4 border border-border rounded-lg hover:border-primary transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium capitalize">
                        {post.platform[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium capitalize">{post.platform}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {post.scheduledTime}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {post.status}
                  </span>
                </div>
                
                <p className="text-sm mb-2">{post.content}</p>
                
                {post.hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
