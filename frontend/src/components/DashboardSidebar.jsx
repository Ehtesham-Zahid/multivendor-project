import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  MessageCircleMoreIcon,
  GiftIcon,
  SendToBackIcon,
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
import { Link } from "react-router";
import { SidebarFooter, SidebarHeader } from "../shadcn/sidebar";

import Logo from "../assets/images/logo.png";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: Inbox,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Calendar,
  },
  {
    title: "Events",
    url: "/dashboard/events",
    icon: Search,
  },
  {
    title: "Withdraw Money",
    url: "#",
    icon: Settings,
  },
  {
    title: "Shop Inbox",
    url: "#",
    icon: MessageCircleMoreIcon,
  },
  {
    title: "Refunds",
    url: "/dashboard/refunds",
    icon: SendToBackIcon,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  return (
    <Sidebar className="text-l">
      <SidebarContent className="flex  ">
        <SidebarHeader className={"border-b-2 border-dark "}>
          <Link className="text-4xl xl:text-5xl font-black  py-2 " to="/">
            Swift<span className="text-primary">Cart</span>
          </Link>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="my-1.5">
                    <Link to={item.url} className="flex items-center gap-4">
                      <item.icon size={28} className="text-primary w-36" />
                      <span className="text-lg">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="border-t-2 flex flex-row items-center mt-auto">
          <img
            src={Logo}
            className="w-12 h-12 rounded-full border-2 border-dark"
          />
          <div>
            <p className="font-bold">Hyper products</p>
            <p className="">Rating</p>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
