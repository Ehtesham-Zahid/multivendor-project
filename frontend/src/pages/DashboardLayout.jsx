import { Outlet } from "react-router";
import DashboardHeader from "../components/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";

const DashboardLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {/* <PanelLeftIcon size={28} /> */}
          {/* <DashboardHeader /> */}
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
