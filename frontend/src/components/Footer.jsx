import { Facebook, Instagram, Twitter, X, Youtube } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-dark  text-white grid grid-cols-4 gap-10 p-10 mt-20  ">
      <div className="flex flex-col gap-y-8">
        <p className="text-5xl font-black">
          Swift<span className="text-primary">Cart</span>
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur
          assumenda cupiditate, id facere animi totam sit ullam esse quo iste?
        </p>
        <div className=" flex gap-3">
          <Link>
            <Facebook
              className="bg-primary rounded-full p-2 hover:bg-blue-700 "
              size="35px"
            />
          </Link>
          <Link>
            <Instagram
              className="bg-primary rounded-full p-2 hover:bg-blue-700 "
              size="35px"
            />
          </Link>
          <Link>
            <Twitter
              className="bg-primary rounded-full p-2 hover:bg-blue-700 "
              size="35px"
            />
          </Link>
          <Link>
            <Youtube
              className="bg-primary rounded-full p-2 hover:bg-blue-700 "
              size="35px"
            />
          </Link>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold mb-8">Company</p>
        <ul className="flex flex-col gap-y-2 text-gray-300 text-[15px]">
          <li className="hover:text-white cursor-pointer">About us</li>
          <li className="hover:text-white cursor-pointer">Careers</li>
          <li className="hover:text-white cursor-pointer">Store Locations</li>
          <li className="hover:text-white cursor-pointer">Our Blog</li>
          <li className="hover:text-white cursor-pointer">Reviews</li>
        </ul>
      </div>
      <div>
        <p className="text-2xl font-bold mb-8">Shop</p>
        <ul className="flex flex-col gap-y-2 text-gray-300 text-[15px]">
          <li className="hover:text-white cursor-pointer">About us</li>
          <li className="hover:text-white cursor-pointer">Careers</li>
          <li className="hover:text-white cursor-pointer">Store Locations</li>
          <li className="hover:text-white cursor-pointer">Our Blog</li>
          <li className="hover:text-white cursor-pointer">Reviews</li>
        </ul>
      </div>
      <div>
        <p className="text-2xl font-bold mb-8">Support</p>
        <ul className="flex flex-col gap-y-2 text-gray-300 text-[15px]">
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
