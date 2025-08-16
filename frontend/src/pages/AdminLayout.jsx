import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";
import { ToastContainer } from "react-toastify";
import { AdminSidebar } from "../components";

const AdminLayout = () => {
  return (
    <div className="w-full">
      <SidebarProvider>
        <AdminSidebar />
        <main className="w-full h-screen">
          <ToastContainer />
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
