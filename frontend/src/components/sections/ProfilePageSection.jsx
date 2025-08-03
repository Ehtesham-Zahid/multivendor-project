import { useSelector } from "react-redux";
import { Sidebar, SidebarProvider, SidebarTrigger } from "../../shadcn/sidebar";
import ProfileSidebar from "../ProfileSidebar";
import AddressSection from "./AddressSection";
import ChangePasswordSection from "./ChangePasswordSection";
import OrdersSection from "./OrdersSection";
import ProfileSection from "./ProfileSection";
import RefundsSection from "./RefundsSection";
import TrackOrderSection from "./TrackOrderSection";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const ProfilePageSection = () => {
  const { currentProfilePageSection } = useSelector((state) => state.profile);

  let section = <ProfileSection />;
  if (currentProfilePageSection === "profile") {
    section = <ProfileSection />;
  } else if (currentProfilePageSection === "orders") {
    section = <OrdersSection />;
  } else if (currentProfilePageSection === "refunds") {
    section = <RefundsSection />;
  } else if (currentProfilePageSection === "inbox") {
    section = <RefundsSection />;
  } else if (currentProfilePageSection === "trackOrder") {
    section = <TrackOrderSection />;
  } else if (currentProfilePageSection === "changePassword") {
    section = <ChangePasswordSection />;
  } else if (currentProfilePageSection === "addresses") {
    section = <AddressSection />;
  }
  return (
    <div className="w-custom m-auto flex my-10 gap-10">
      <ProfileSidebar />
      {section}
    </div>
  );
};

export default ProfilePageSection;
