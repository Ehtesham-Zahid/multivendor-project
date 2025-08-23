import { Link } from "react-router";
import { Button } from "../../shadcn/button";
import { useSelector } from "react-redux";

const CtaSection = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="w-custom mx-auto my-20 cta-bg h-[500px] rounded-lg p-2">
      <div className="flex flex-col gap-8 justify-center items-center h-full">
        <div className="flex flex-col gap-5 items-center">
          <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-black text-white text-center">
            Ready to <span className="text-primary">Elevate</span> Your
            Business?
          </h2>
          <p className="text-white  text-center text-sm sm:text-lg w-5/6 sm:w-3/4 md:w-2/3 lg:w-3/4">
            Join a growing marketplace where buyers meet sellers. Start selling
            with ease, and grow your business effortlessly.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-44 sm:w-auto">
          {user ? (
            user.role === "vendor" ? (
              <Link to={"/dashboard"}>
                <Button className="text-white w-full sm:w-auto text-base bg-primary p-5 sm:p-6   hover:bg-primary/90 cursor-pointer">
                  Dashboard
                </Button>
              </Link>
            ) : user.role === "admin" ? (
              <Link to={"/admin"}>
                <Button className="text-white w-full sm:w-auto text-base bg-primary p-5 sm:p-6   hover:bg-primary/90 cursor-pointer">
                  Admin Dashboard
                </Button>
              </Link>
            ) : (
              <Link to={"/create-shop"}>
                <Button className="text-white w-full sm:w-auto text-base bg-primary p-5 sm:p-6   hover:bg-primary/90 cursor-pointer">
                  Become a Seller
                </Button>
              </Link>
            )
          ) : (
            <Link to={"/create-shop"}>
              <Button className="text-white w-full sm:w-auto text-base bg-primary p-5 sm:p-6   hover:bg-primary/90 cursor-pointer">
                Become a Seller
              </Button>
            </Link>
          )}
          <Link to={"/all-products"}>
            <Button className="text-black w-full sm:w-auto text-base bg-white border-white p-5 sm:p-6   hover:bg-white/80 cursor-pointer">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
