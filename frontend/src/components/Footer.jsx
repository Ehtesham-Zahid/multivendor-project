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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
          assumenda cupiditate, id facere animi totam sit ullam esse quo iste?
        </p>
        <div className="flex gap-3 flex-wrap">
          <Link>
            <Facebook className="bg-primary rounded-full p-2 hover:bg-blue-700 w-8 h-8 md:w-9 md:h-9" />
          </Link>
          <Link>
            <Instagram className="bg-primary rounded-full p-2 hover:bg-blue-700 w-8 h-8 md:w-9 md:h-9" />
          </Link>
          <Link>
            <Twitter className="bg-primary rounded-full p-2 hover:bg-blue-700 w-8 h-8 md:w-9 md:h-9" />
          </Link>
          <Link>
            <Youtube className="bg-primary rounded-full p-2 hover:bg-blue-700 w-8 h-8 md:w-9 md:h-9" />
          </Link>
        </div>
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
        <p className="text-xl md:text-2xl font-bold mb-6 md:mb-8">Shop</p>
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
