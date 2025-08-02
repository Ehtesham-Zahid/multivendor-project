import { Sidebar, SidebarProvider, SidebarTrigger } from "../../shadcn/sidebar";
import ProfileSidebar from "../ProfileSidebar";
import ProfileSection from "./ProfileSection";

const ProfilePageSection = () => {
  return (
    <div className="w-custom m-auto flex my-10">
      <ProfileSidebar />
      <div>
        <ProfileSection />
      </div>
    </div>
  );
};

export default ProfilePageSection;
