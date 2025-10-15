import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, X } from "lucide-react";

interface DashboardWidgetProps {
  title: string;
  children: React.ReactNode;
  onRemove?: () => void;
}

export function DashboardWidget({ title, children, onRemove }: DashboardWidgetProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        {onRemove && (
          <Button variant="ghost" size="icon" onClick={onRemove} className="h-6 w-6">
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {children}
      </div>
    </Card>
  );
}
