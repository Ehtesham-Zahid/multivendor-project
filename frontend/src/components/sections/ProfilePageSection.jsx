import { Sidebar, SidebarProvider, SidebarTrigger } from "../../shadcn/sidebar";
import ProfileSidebar from "../ProfileSidebar";
import AddressSection from "./AddressSection";
import ChangePasswordSection from "./ChangePasswordSection";
import OrdersSection from "./OrdersSection";
import ProfileSection from "./ProfileSection";
import RefundsSection from "./RefundsSection";

const ProfilePageSection = () => {
  return (
    <div className="w-custom m-auto flex my-10 gap-10">
      <ProfileSidebar />
      {/* <ProfileSection /> */}
      <OrdersSection />
      {/* <RefundsSection /> */}
      {/* <ChangePasswordSection /> */}
      {/* <AddressSection /> */}
    </div>
  );
};

export default ProfilePageSection;
