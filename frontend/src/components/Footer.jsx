import { Facebook, Instagram, Twitter, X, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-dark text-white p-6 md:p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      <div className="flex flex-col gap-y-6 md:gap-y-8">
        <p className="text-3xl sm:text-4xl md:text-5xl font-black">
          Swift<span className="text-primary">Cart</span>
        </p>
        <p className="text-gray-300 text-sm md:text-base">
          SwiftCart is a trusted partner for innovative e-commerce solutions.
          Creating beautiful digital experiences that drive success.
        </p>
        <ul className="flex gap-3 flex-wrap">
          <li>
            <Facebook className="bg-primary rounded-full p-2 hover:bg-sky-600 w-8 h-8 md:w-9 md:h-9" />
          </li>
          <li>
            <Instagram className="bg-primary rounded-full p-2 hover:bg-sky-600 w-8 h-8 md:w-9 md:h-9" />
          </li>
          <li>
            <Twitter className="bg-primary rounded-full p-2 hover:bg-sky-600 w-8 h-8 md:w-9 md:h-9" />
          </li>
          <li>
            <Youtube className="bg-primary rounded-full p-2 hover:bg-sky-600 w-8 h-8 md:w-9 md:h-9" />
          </li>
        </ul>
      </div>
      <div>
        <p className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Shop</p>
        <ul className="flex flex-col gap-y-2 text-gray-300 text-sm md:text-[15px]">
          <li className="hover:text-white cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to="/best-selling">Best Selling</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to="/all-products">Products</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to="/all-events">Events</Link>
          </li>
          <li className="hover:text-white cursor-pointer">
            <Link to="/faqs">FAQs</Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Company</p>
        <ul className="flex flex-col gap-y-2 text-gray-300 text-sm md:text-[15px]">
          <li className="hover:text-white cursor-pointer">About us</li>
          <li className="hover:text-white cursor-pointer">Careers</li>
          <li className="hover:text-white cursor-pointer">Store Locations</li>
          <li className="hover:text-white cursor-pointer">Our Blog</li>
          <li className="hover:text-white cursor-pointer">Reviews</li>
        </ul>
      </div>
      <div>
        <p className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Support</p>
        <ul className="flex flex-col gap-y-2 text-gray-300 text-sm md:text-[15px]">
          <li className="hover:text-white cursor-pointer">About us</li>
          <li className="hover:text-white cursor-pointer">Careers</li>
          <li className="hover:text-white cursor-pointer">Store Locations</li>
          <li className="hover:text-white cursor-pointer">Our Blog</li>
          <li className="hover:text-white cursor-pointer">Reviews</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
