import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { PostScheduler } from "@/components/calendar/PostScheduler";

export default function ContentCalendar() {
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header />
        
        <main className="p-4 md:p-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-[32px] font-bold mb-2">Content Calendar</h1>
            <p className="text-muted-foreground">
              Plan, schedule, and manage your social media posts
            </p>
          </div>

          <PostScheduler />
        </main>
      </div>
    </div>
  );
}
