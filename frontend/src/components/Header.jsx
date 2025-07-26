import { ArrowRight } from "lucide-react";
import { Search } from "lucide-react";

const Header = () => {
  return (
    <div className="header  backdrop-blur-3xl">
      <div className="primary-nav flex justify-between p-5 border-b-2">
        <p className="text-3xl font-bold">
          Swift<span className="text-primary">Cart</span>
        </p>
        <div className="w-1/2 border-2  border-primary outline-none flex justify-center  rounded-md px-5">
          <input
            type="text"
            placeholder="Search for Products"
            name="search"
            id="search"
            className="w-full outline-none"
          />
          <button className="border-s-2 border-primary ps-3 font text-dark cursor-pointer">
            <Search strokeWidth={3} color="#1f2937" />
          </button>
        </div>
        <button className="bg-primary text-white px-5 py-3 flex rounded-md font-semibold">
          Become Seller <ArrowRight />
        </button>
      </div>
      <div className="secondary-nav">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Header;
