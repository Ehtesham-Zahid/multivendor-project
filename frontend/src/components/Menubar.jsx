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
import { Link } from "react-router";
import WishlistSheet from "./WishlistSheet";
import CartSheet from "./CartSheet";
import logo from "../assets/images/logo.png";
import SearchInput from "./SearchInput";
import { Button } from "../shadcn/button";
import CategoryDropdown from "./CategoryDropdown";
import { useSelector } from "react-redux";

const Menubar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="lg:hidden">
      <Sheet>
        <div className="flex justify-between items-center p-5 bg-primary">
          <SheetTrigger className="lg:hidden w-[120px] ">
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
                    <SheetClose>Home</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/best-selling">
                    <SheetClose>Best Selling</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/products">
                    <SheetClose>Products</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/events">
                    <SheetClose>Events</SheetClose>
                  </Link>
                </li>
                <li>
                  <Link to="/faqs">
                    <SheetClose>FAQs</SheetClose>
                  </Link>
                </li>
                <CategoryDropdown />

                {user ? (
                  user?.hasShop ? (
                    <Link to="/dashboard">
                      <Button
                        className="bg-primary text-white w-full text-lg    cursor-pointer"
                        size="lg"
                      >
                        <SheetClose>Dashboard</SheetClose>{" "}
                        <ArrowRightIcon className="ml-2 w-8 h-8" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/create-shop">
                      <Button
                        className="bg-primary text-white w-full text-md   cursor-pointer"
                        size="lg"
                      >
                        <SheetClose>Become Seller</SheetClose>{" "}
                        <ArrowRight size={20} />
                      </Button>
                    </Link>
                  )
                ) : (
                  <Link to="/auth/login">
                    <Button
                      className="bg-primary text-white w-full text-md   cursor-pointer"
                      size="lg"
                    >
                      <SheetClose>Become Seller</SheetClose>{" "}
                      <ArrowRight size={20} />
                    </Button>
                  </Link>
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
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Menubar;
