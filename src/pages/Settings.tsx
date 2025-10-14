import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrandingSettings } from "@/components/settings/BrandingSettings";
import { TeamManagement } from "@/components/settings/TeamManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-4 md:p-8">
          <h1 className="text-2xl md:text-[32px] font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-6 md:mb-8">
            Manage your account and integrations
          </p>
          
          <Tabs defaultValue="connections" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="connections">Connections</TabsTrigger>
              <TabsTrigger value="branding">Branding</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="connections" className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
                
                <div className="space-y-4">
                  {["X (Twitter)", "Instagram", "LinkedIn"].map((platform) => (
                    <div
                      key={platform}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{platform}</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                      <Button variant="outline">Connect</Button>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
}
