import { Card } from "@/components/ui/card";
import { ArrowUp, MessageSquare } from "lucide-react";

export function RedditProfileCard() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Reddit Profile</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Total Karma</p>
          <div className="flex items-center gap-2">
            <ArrowUp className="w-4 h-4 text-success" />
            <p className="font-bold text-2xl">12,482</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Comment Karma</p>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <p className="font-bold text-2xl">8,123</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">Account Age</p>
          <p className="font-medium">3 years, 2 months</p>
        </div>
      </div>
    </Card>
  );
}