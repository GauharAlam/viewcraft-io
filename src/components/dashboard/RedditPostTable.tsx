import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, MessageSquare, Percent } from "lucide-react";

const mockPosts = [
  { id: "1", title: "Just launched my new project on Product Hunt!", subreddit: "r/SideProject", score: 1204, comments: 256, upvoteRatio: "98%" },
  { id: "2", title: "What's your favorite underrated marketing tool?", subreddit: "r/marketing", score: 872, comments: 412, upvoteRatio: "95%" },
  { id: "3", title: "Sharing my journey of growing a SaaS to $10k MRR", subreddit: "r/SaaS", score: 2300, comments: 512, upvoteRatio: "99%" },
];

const sentimentData = [
  { name: 'Positive', value: 310 },
  { name: 'Neutral', value: 120 },
  { name: 'Negative', value: 82 },
];
const COLORS = ['hsl(var(--chart-3))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

export function RedditPostTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<(typeof mockPosts)[0] | null>(null);

  const handleAnalyzeClick = (post: (typeof mockPosts)[0]) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Post Performance</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Post Title</TableHead>
              <TableHead>Subreddit</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Upvote %</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-xs truncate">{post.title}</TableCell>
                <TableCell><Badge variant="outline">{post.subreddit}</Badge></TableCell>
                <TableCell className="flex items-center gap-1"><TrendingUp className="w-4 h-4 text-success" /> {post.score.toLocaleString()}</TableCell>
                <TableCell><MessageSquare className="w-4 h-4 inline mr-1" /> {post.comments}</TableCell>
                <TableCell><Percent className="w-4 h-4 inline mr-1" /> {post.upvoteRatio}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleAnalyzeClick(post)}>
                    Analyze Sentiment
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Sentiment Analysis</DialogTitle>
            <p className="text-sm text-muted-foreground truncate">
              {selectedPost?.title}
            </p>
          </DialogHeader>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}