import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { SidebarProvider } from "../shadcn/sidebar";

const DashboardPage = () => {
  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <DashboardHeader />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
