import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-8">
          <h1 className="text-[32px] font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and integrations</p>
          
          <div className="mt-8 grid gap-6 max-w-3xl">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Connected Accounts</h3>
              
              <div className="space-y-4">
                {["X (Twitter)", "Instagram", "LinkedIn"].map((platform) => (
                  <div key={platform} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{platform}</p>
                      <p className="text-sm text-muted-foreground">Not connected</p>
                    </div>
                    <Button variant="outline">Connect</Button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
