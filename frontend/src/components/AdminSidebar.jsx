import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  CreditCard,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/sidebar";
import { Link } from "react-router";
import { SidebarHeader, useSidebar } from "../shadcn/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "All Shops",
    url: "/admin/shops",
    icon: Inbox,
  },
  {
    title: "All Orders",
    url: "/admin/orders",
    icon: CreditCard,
  },
  {
    title: "All Refunds",
    url: "/admin/refunds",
    icon: Wallet,
  },
  {
    title: "All Products",
    url: "/admin/products",
    icon: Calendar,
  },
  {
    title: "All Events",
    url: "/admin/events",
    icon: Search,
  },
  {
    title: "Withdraw Money",
    url: "#",
    icon: Settings,
  },

  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const { setOpenMobile, setOpen, isMobile } = useSidebar();

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar className="text-l h-full">
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
                <SidebarMenuItem key={item.title} onClick={handleClick}>
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
        {/* <SidebarFooter className="border-t-2 flex flex-row items-center mt-auto">
          <Link
            to={`/shop/${currentUserShop?._id}`}
            className="flex items-center gap-2"
          >
            <img
              src={currentUserShop?.imageUrl}
              className="w-12 h-12 rounded-full border-2 border-dark"
            />
            <div>
              <p className="font-bold">{currentUserShop?.shopName}</p>
              <p className="">Rating: {currentUserShop?.rating}/5</p>
            </div>
          </Link>
        </SidebarFooter> */}
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
