import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../shadcn/sidebar";
import { ToastContainer } from "react-toastify";
import { AdminSidebar, RoleRoute } from "../components";

const AdminLayout = () => {
  return (
    <RoleRoute roles={["admin"]}>
      <div className="w-full">
        <SidebarProvider>
          <AdminSidebar />
          <main className="w-full h-screen">
            {/* <ToastContainer /> */}
            <SidebarTrigger />
            <Outlet />
          </main>
        </SidebarProvider>
      </div>
    </RoleRoute>
  );
};

export default AdminLayout;
