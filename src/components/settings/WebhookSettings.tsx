import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Webhook, Copy, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  enabled: boolean;
}

const mockWebhooks: WebhookConfig[] = [
  {
    id: "1",
    name: "Zapier Integration",
    url: "https://hooks.zapier.com/hooks/catch/12345/abcde",
    events: ["negative_sentiment", "follower_milestone"],
    enabled: true
  }
];

const availableEvents = [
  { id: "negative_sentiment", label: "Negative Sentiment Detected" },
  { id: "high_engagement", label: "High Engagement Post" },
  { id: "follower_milestone", label: "Follower Milestone Reached" },
  { id: "report_generated", label: "Report Generated" },
  { id: "goal_achieved", label: "Goal Achieved" },
];

export function WebhookSettings() {
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [newWebhookUrl, setNewWebhookUrl] = useState("");
  const { toast } = useToast();

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Copied!",
      description: "Webhook URL copied to clipboard",
    });
  };

  const handleAddWebhook = () => {
    if (!newWebhookUrl) return;
    
    const newWebhook: WebhookConfig = {
      id: Date.now().toString(),
      name: "New Webhook",
      url: newWebhookUrl,
      events: [],
      enabled: true
    };
    
    setWebhooks([...webhooks, newWebhook]);
    setNewWebhookUrl("");
    toast({
      title: "Webhook Added",
      description: "Your webhook has been configured successfully",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Webhook className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Webhook Integrations</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">
          Connect to Zapier, Make.com, or any webhook-compatible service to automate workflows based on your social media events.
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhook-url"
                placeholder="https://hooks.zapier.com/hooks/catch/..."
                value={newWebhookUrl}
                onChange={(e) => setNewWebhookUrl(e.target.value)}
              />
              <Button onClick={handleAddWebhook}>Add</Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Configured Webhooks</h4>
          
          {webhooks.map((webhook) => (
            <Card key={webhook.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium">{webhook.name}</p>
                    <Badge variant={webhook.enabled ? "default" : "secondary"}>
                      {webhook.enabled ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {webhook.url.substring(0, 50)}...
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleCopyUrl(webhook.url)}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={webhook.enabled} />
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Trigger Events:</p>
                <div className="flex flex-wrap gap-2">
                  {availableEvents.map((event) => (
                    <Badge
                      key={event.id}
                      variant={webhook.events.includes(event.id) ? "default" : "outline"}
                      className="cursor-pointer"
                    >
                      {event.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-accent/50">
        <h4 className="font-medium mb-2">Example Use Cases</h4>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>• Send a Slack message when negative sentiment is detected</li>
          <li>• Create a Trello card when a follower milestone is reached</li>
          <li>• Upload weekly reports to Google Drive automatically</li>
          <li>• Trigger email campaigns based on engagement spikes</li>
        </ul>
      </Card>
    </div>
  );
}
