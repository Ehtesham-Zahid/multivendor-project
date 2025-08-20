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
import {
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "../shadcn/sidebar";

import Logo from "../assets/images/logo.png";
import { SheetClose } from "../shadcn/sheet";
import { useDispatch, useSelector } from "react-redux";
import { getShopUnreadCountThunk } from "../features/chat/chatSlice";
import { useEffect } from "react";

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
    url: "/dashboard/withdrawal",
    icon: Settings,
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
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
  const { setOpenMobile, setOpen, isMobile } = useSidebar();
  const { currentUserShop } = useSelector((state) => state.shop);
  const { totalShopUnreadCount } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  useEffect(() => {
    dispatch(getShopUnreadCountThunk());
  }, []);

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
                    {item.title === "Inbox" ? (
                      <div className=" flex items-center justify-start gap-2">
                        <Link to={item.url} className="flex items-center gap-4">
                          <item.icon size={18} className="text-primary " />
                          <span className="text-lg">{item.title}</span>
                        </Link>
                        <span className=" mt-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {totalShopUnreadCount}
                        </span>
                      </div>
                    ) : (
                      <Link to={item.url} className="flex items-center gap-4">
                        <item.icon size={28} className="text-primary  " />
                        <span className="text-lg">{item.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="border-t-2 flex flex-row items-center mt-auto">
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
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
