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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: Home,
  },
  {
    title: "Orders",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Products",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Events",
    url: "#",
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
                    <a href={item.url} className="flex items-center gap-4">
                      <item.icon size={28} className="text-primary w-36" />
                      <span className="text-lg">{item.title}</span>
                    </a>
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
