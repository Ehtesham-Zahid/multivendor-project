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
  return (
    <div className="bg-white shadow-2xl w-60 rounded-md p-5">
      <ul className="flex flex-col gap-8 text-lg">
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <UserRound size={24} /> Profile
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <ListOrdered size={24} /> Orders
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <SendToBackIcon size={24} /> Refunds
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <MessageCircleIcon size={24} /> Inbox
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <CircleAlert size={24} /> Track Order
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <Lock size={24} /> Change Password
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <HomeIcon size={24} /> Addresses
          </Link>
        </li>
        <li>
          <Link className="flex font-medium gap-3 items-center">
            <LogOut size={24} /> Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
