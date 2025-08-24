import {
  ArrowRight,
  ArrowRightIcon,
  CircleUserRound,
  MenuIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn/sheet";
import { Link, useLocation } from "react-router";
import WishlistSheet from "./WishlistSheet";
import CartSheet from "./CartSheet";
import logo from "../assets/images/logo.png";
import SearchInput from "./SearchInput";
import { Button } from "../shadcn/button";
import CategoryDropdown from "./CategoryDropdown";
import { useSelector } from "react-redux";
import SidebarSearchDetails from "./SidebarSearchDetails";
import { useEffect, useRef } from "react";

const Menubar = () => {
  const { user } = useSelector((state) => state.auth);
  const { searchTerm } = useSelector((state) => state.product);
  const location = useLocation();
  const sheetCloseRef = useRef();

  useEffect(() => {
    // Close sheet whenever route changes
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  }, [location.pathname]);

  return (
    <div className="lg:hidden">
      <Sheet>
        <div className="flex justify-between items-center p-5 bg-primary">
          <SheetTrigger className="lg:hidden w-[120px] cursor-pointer">
            <MenuIcon className="text-white" />
          </SheetTrigger>
          {/* <img src={logo} alt="logo" className="w-20 h-20" /> */}
          <Link className="sm:text-4xl text-3xl font-black w-[120px]" to="/">
            Swift<span className="text-white">Cart</span>
          </Link>
          <div className="flex gap-5 w-[120px] justify-end text-white">
            <CartSheet />
            <WishlistSheet />
          </div>
        </div>
        <SheetContent side="left">
          {searchTerm && <SidebarSearchDetails />}
          <SheetHeader>
            <SheetTitle>
              <Link className="text-4xl font-black w-[120px]" to="/">
                Swift<span className="text-primary">Cart</span>
              </Link>
            </SheetTitle>
            <SheetDescription className="mt-5">
              <SearchInput />
              <ul className="mt-5 flex flex-col gap-5 text-lg">
                <li>
                  <Link to="/">
                    <SheetClose className="cursor-pointer">Home</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/best-selling">
                    <SheetClose className="cursor-pointer">
                      Best Selling
                    </SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/all-products">
                    <SheetClose className="cursor-pointer">Products</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/all-events">
                    <SheetClose className="cursor-pointer">Events</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/faqs">
                    <SheetClose className="cursor-pointer">FAQs</SheetClose>
                  </Link>
                </li>
                <div className="my-auto ">
                  <CategoryDropdown />
                </div>

                {user ? (
                  user?.role === "vendor" ? (
                    <Button className="bg-primary text-white w-full text-lg cursor-pointer p-5">
                      <Link
                        className=" flex items-center gap-2"
                        to="/dashboard"
                      >
                        <SheetClose className="cursor-pointer">
                          Dashboard
                        </SheetClose>{" "}
                        <ArrowRightIcon className=" w-10 h-10" />
                      </Link>
                    </Button>
                  ) : user?.role === "admin" ? (
                    <Button className="bg-primary text-white w-full text-lg cursor-pointer p-5">
                      <Link className=" flex items-center gap-2" to="/admin">
                        <SheetClose className="cursor-pointer">
                          Admin Dashboard
                        </SheetClose>{" "}
                        <ArrowRightIcon className=" w-10 h-10" />
                      </Link>
                    </Button>
                  ) : (
                    <Button className="bg-primary text-white w-full text-lg cursor-pointer p-5">
                      <Link
                        className=" flex items-center gap-2"
                        to="/create-shop"
                      >
                        <SheetClose className="cursor-pointer">
                          Become Seller
                        </SheetClose>{" "}
                        <ArrowRightIcon className=" w-10 h-10" />
                      </Link>
                    </Button>
                  )
                ) : (
                  <Button className="bg-primary text-white w-full text-lg cursor-pointer p-5">
                    <Link className=" flex items-center gap-2" to="/auth/login">
                      <SheetClose className="cursor-pointer">
                        Become Seller
                      </SheetClose>{" "}
                      <ArrowRightIcon className=" w-10 h-10" />
                    </Link>
                  </Button>
                )}
              </ul>
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex justify-start items-start border-t-2 border-primary p-3 gap-3">
            <Link
              to={`${user ? "/profile" : "/auth/login"}`}
              className="flex items-center gap-2"
            >
              {user ? (
                <img
                  src={user?.imageUrl}
                  alt="user"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <CircleUserRound className="w-8 h-8" />
              )}
              <span className="text-md font-bold">
                {user ? user?.fullname : "Login"}
              </span>
            </Link>
          </SheetFooter>

          {/* Hidden ref for programmatic closing */}
          <SheetClose ref={sheetCloseRef} className="hidden" />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menubar;
