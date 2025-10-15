import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Target } from "lucide-react";

interface Goal {
  id: string;
  title: string;
  current: number;
  target: number;
  deadline: string;
  platform: string;
}

const mockGoals: Goal[] = [
  {
    id: "1",
    title: "Reach 10,000 followers",
    current: 7583,
    target: 10000,
    deadline: "Dec 2024",
    platform: "Instagram"
  },
  {
    id: "2",
    title: "Increase engagement by 15%",
    current: 12,
    target: 15,
    deadline: "Q4 2024",
    platform: "X (Twitter)"
  },
  {
    id: "3",
    title: "1M total reach",
    current: 750000,
    target: 1000000,
    deadline: "Dec 2024",
    platform: "All Platforms"
  }
];

export function GoalsWidget() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Goals</h3>
        </div>
        <Button variant="outline" size="sm">Manage Goals</Button>
      </div>

      <div className="space-y-6">
        {mockGoals.map((goal) => {
          const progress = (goal.current / goal.target) * 100;
          
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{goal.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {goal.platform} · Due {goal.deadline}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{progress.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground">
                    {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                  </p>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          );
        })}
      </div>
    </Card>
  );
}
