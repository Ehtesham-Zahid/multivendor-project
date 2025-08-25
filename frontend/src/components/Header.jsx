import { ArrowRight, CircleUserRound } from "lucide-react";

import { Link } from "react-router";
import { useSelector } from "react-redux";
import CartSheet from "./CartSheet";
import WishlistSheet from "./WishlistSheet";

import CategoryDropdown from "./CategoryDropdown";
import SearchInput from "./SearchInput";
import Menubar from "./Menubar";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { shop } = useSelector((state) => state.shop);

  console.log(shop);

  return (
    <>
      <Menubar />
      <div className="header   backdrop-blur-3xl  w-full lg:flex flex-col items-center hidden ">
        <div className="primary-nav flex justify-between py-5 border-b-2 border-transparent w-custom  items-center">
          <Link className="text-5xl font-black" to="/">
            Swift<span className="text-primary">Cart</span>
          </Link>
          <SearchInput />
          {user ? (
            user?.role === "vendor" ? (
              <Link
                className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
                to="/dashboard"
              >
                Dashboard <ArrowRight />
              </Link>
            ) : user?.role === "admin" ? (
              <Link
                className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
                to="/admin"
              >
                Admin Dashboard <ArrowRight />
              </Link>
            ) : (
              <Link
                className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
                to="/create-shop"
              >
                Become Seller <ArrowRight />
              </Link>
            )
          ) : (
            <Link
              className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold gap-2.5"
              to="/auth/login"
            >
              Become Seller <ArrowRight />
            </Link>
          )}
        </div>
        <div className="secondary-nav bg-primary w-full flex justify-center">
          <div className="w-custom flex justify-between  text-white font-semibold items-center">
            <div className="text-dark py-1 my-auto">
              <CategoryDropdown />
            </div>
            <ul className="  gap-12 flex items-center ">
              <li>
                <Link to="/" className="relative inline-block group">
                  <span className="relative z-10">Home</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/best-selling"
                  className="relative inline-block group"
                >
                  <span className="relative z-10  transition">
                    Best Selling
                  </span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products"
                  className="relative inline-block group"
                >
                  <span className="relative z-10  transition">Products</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/all-events" className="relative inline-block group">
                  <span className="relative z-10  transition">Events</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="relative inline-block group">
                  <span className="relative z-10  transition">FAQs</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
            <div className="flex gap-5 py-5 items-center ">
              <WishlistSheet />
              <CartSheet />
              {user ? (
                <Link to={`/profile`}>
                  <img
                    src={user?.imageUrl}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                </Link>
              ) : (
                <Link to={`/auth/login`}>
                  <CircleUserRound />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
