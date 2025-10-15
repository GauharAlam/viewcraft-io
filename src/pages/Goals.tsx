import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GoalsWidget } from "@/components/goals/GoalsWidget";

export default function Goals() {
  const [date, setDate] = useState<Date>();

  return (
    <main className="p-4 pt-20 md:p-8 md:pt-24">
      <h1 className="text-2xl md:text-[32px] font-bold mb-2">Goals & Tracking</h1>
      <p className="text-muted-foreground mb-6 md:mb-8">
        Set and track your social media objectives
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GoalsWidget />
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Create New Goal</h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="goal-title">Goal Title</Label>
              <Input id="goal-title" placeholder="e.g., Reach 10,000 followers" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current">Current Value</Label>
                <Input id="current" type="number" placeholder="7583" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target">Target Value</Label>
                <Input id="target" type="number" placeholder="10000" />
              </div>
            </div>
            
            <div className="space-y-2">
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
            
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
}