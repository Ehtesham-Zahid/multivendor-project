import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import ProfileSidebar from "../components/ProfileSidebar";
import { RoleRoute } from "../components";

const ProfileLayout = () => {
  return (
    <RoleRoute roles={["user", "vendor", "admin"]}>
      <div className="w-full">
        <main className="w-custom m-auto flex flex-col md:flex-row my-10 gap-10">
          {/* <ToastContainer /> */}
          <ProfileSidebar />
          <Outlet />
        </main>
      </div>
    </RoleRoute>
  );
};

export default ProfileLayout;
