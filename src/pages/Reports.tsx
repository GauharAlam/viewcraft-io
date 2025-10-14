import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";

export default function Reports() {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-8">
          <h1 className="text-[32px] font-bold mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and schedule automated reports</p>
          
          <div className="mt-8 bg-card border border-border rounded-lg p-12 text-center">
            <p className="text-muted-foreground">Report scheduling coming soon...</p>
          </div>
        </main>
      </div>
    </div>
  );
}
