import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import ProfileSidebar from "../components/ProfileSidebar";

const ProfileLayout = () => {
  return (
    <div className="w-full">
      <ToastContainer />
      <main className="w-custom m-auto flex my-10 gap-10">
        <ProfileSidebar />
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
