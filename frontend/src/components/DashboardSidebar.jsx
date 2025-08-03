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
    title: "Discount Codes",
    url: "#",
    icon: GiftIcon,
  },
  {
    title: "Refunds",
    url: "#",
    icon: SendToBackIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const DashboardSidebar = () => {
  return (
    <Sidebar className="text-l">
      <SidebarContent>
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
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
