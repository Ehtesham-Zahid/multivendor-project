import { Outlet } from "react-router";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { SidebarProvider } from "../shadcn/sidebar";

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          {/* <DashboardHeader /> */}
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
