import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrandingSettings } from "@/components/settings/BrandingSettings";
import { TeamManagement } from "@/components/settings/TeamManagement";
import { WebhookSettings } from "@/components/settings/WebhookSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <main className="p-4 pt-20 md:p-8 md:pt-24">
      {/* Centering container with a max-width */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-[32px] font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground mb-6 md:mb-8">
          Manage your account and integrations
        </p>
        
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="connections">Connections</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
              
              <div className="space-y-4">
                {["X (Twitter)", "Instagram", "LinkedIn", "Reddit"].map((platform) => (
                  <div
                    key={platform}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{platform}</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                    <Button asChild variant="outline">
                      <a href={`/api/auth/connect/${platform.toLowerCase().split(' ')[0]}`}>Connect</a>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <BrandingSettings />
          </TabsContent>

          <TabsContent value="team">
            <TeamManagement />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhookSettings />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}