import {
  Calendar,
  CircleAlert,
  Home,
  HomeIcon,
  Inbox,
  ListOrdered,
  Lock,
  LogOut,
  MessageCircleIcon,
  Parentheses,
  Search,
  SendToBackIcon,
  Settings,
  TrainTrack,
  User,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/sidebar";
import { SidebarProvider } from "../shadcn/sidebar";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { profilePageSection } from "../features/profile/profileSlice";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const ProfileSidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="bg-white shadow-2xl w-64 rounded-md p-5">
      <ul className="flex flex-col gap-8 text-lg">
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("profile"))}
          >
            <UserRound size={20} /> Profile
          </Link>
        </li>
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("orders"))}
          >
            <ListOrdered size={20} /> Orders
          </Link>
        </li>
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("refunds"))}
          >
            <SendToBackIcon size={20} /> Refunds
          </Link>
        </li>
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("inbox"))}
          >
            <MessageCircleIcon size={20} /> Inbox
          </Link>
        </li>
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("trackOrder"))}
          >
            <CircleAlert size={20} /> Track Order
          </Link>
        </li>
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("changePassword"))}
          >
            <Lock size={20} /> Change Password
          </Link>
        </li>
        <li>
          <Link
            className="flex font-medium gap-3 items-center"
            onClick={() => dispatch(profilePageSection("addresses"))}
          >
            <HomeIcon size={20} /> Addresses
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <LogOut size={20} className="rotate-180" /> Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
