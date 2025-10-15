import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoalsWidget } from "@/components/goals/GoalsWidget";
import { Plus } from "lucide-react";

export default function Goals() {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 lg:ml-64">
        <Header />
        
        <main className="p-4 md:p-8">
          <h1 className="text-2xl md:text-[32px] font-bold mb-2">Goals & Tracking</h1>
          <p className="text-muted-foreground mb-6 md:mb-8">
            Set and track your social media objectives
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GoalsWidget />
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Create New Goal</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input id="goal-title" placeholder="e.g., Reach 10,000 followers" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current">Current Value</Label>
                    <Input id="current" type="number" placeholder="7583" />
                  </div>
                  <div>
                    <Label htmlFor="target">Target Value</Label>
                    <Input id="target" type="number" placeholder="10000" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="platform">Platform</Label>
                  <Select>
                    <SelectTrigger id="platform">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Platforms</SelectItem>
                      <SelectItem value="twitter">X (Twitter)</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Goal
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
