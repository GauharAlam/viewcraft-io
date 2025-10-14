import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "all", name: "All Platforms" },
  { id: "twitter", name: "X (Twitter)" },
  { id: "instagram", name: "Instagram" },
  { id: "linkedin", name: "LinkedIn" },
];

interface PlatformSelectProps {
  selected: string;
  onSelect: (platform: string) => void;
}

export function PlatformSelect({ selected, onSelect }: PlatformSelectProps) {
  return (
    <div className="flex gap-2">
      {platforms.map((platform) => (
        <Button
          key={platform.id}
          variant={selected === platform.id ? "default" : "outline"}
          onClick={() => onSelect(platform.id)}
          className={cn(
            "transition-all duration-200",
            selected === platform.id && "shadow-md"
          )}
        >
          {platform.name}
        </Button>
      ))}
    </div>
  );
}
