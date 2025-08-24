import { Link } from "react-router";
import { Button } from "../../shadcn/button";
import { useSelector } from "react-redux";
import { ArrowRight, ShoppingBag, TrendingUp, Users, Star } from "lucide-react";

const CtaSection = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="relative w-custom mx-auto my-20 overflow-hidden">
      {/* Background with gradient and decorative elements */}
      <div className="relative bg-gradient-to-br from-primary via-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/4 to-blue-400/4 rounded-full blur-3xl" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-8 right-8 w-6 h-6 bg-yellow-300/70 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <Star className="h-3 w-3 text-yellow-700 fill-current" />
        </div>
        <div className="absolute bottom-8 left-8 w-4 h-4 bg-white/25 rounded-full shadow-lg" />
        <div className="absolute top-1/3 left-8 w-3 h-3 bg-blue-300/40 rounded-full shadow-lg" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col gap-10 justify-center items-center text-center">
          {/* Header section */}
          <div className="flex flex-col gap-6 items-center max-w-4xl">
            <div className="flex items-center gap-3 bg-white/12 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <TrendingUp className="h-5 w-5 text-white/85" />
              <span className="text-white/80 font-medium text-sm">
                Growing Marketplace
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              Ready to{" "}
              <span className="bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 bg-clip-text text-transparent">
                Elevate
              </span>{" "}
              Your Business?
            </h2>

            <p className="text-white/85 text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed">
              Join a thriving marketplace where buyers meet sellers. Start
              selling with ease, and grow your business effortlessly with our
              powerful platform.
            </p>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 max-w-2xl">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">10K+</p>
              <p className="text-white/75 text-sm sm:text-base">
                Happy Customers
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
              <p className="text-white/75 text-sm sm:text-base">
                Active Vendors
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-white">24/7</p>
              <p className="text-white/75 text-sm sm:text-base">Support</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl">
            {user ? (
              user.role === "vendor" ? (
                <Link to={"/dashboard"} className="flex-1">
                  <Button className="cursor-pointer w-full h-14 sm:h-16 text-lg sm:text-xl font-medium bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-primary border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-2xl">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                </Link>
              ) : user.role === "admin" ? (
                <Link to={"/admin"} className="flex-1">
                  <Button className="cursor-pointer w-full h-14 sm:h-16 text-lg sm:text-xl font-medium bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border border-red-400/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-2xl">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Admin Dashboard
                  </Button>
                </Link>
              ) : (
                <Link to={"/create-shop"} className="flex-1">
                  <Button className="cursor-pointer w-full h-14 sm:h-16 text-lg sm:text-xl font-medium bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-primary border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-2xl">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Become a Seller
                  </Button>
                </Link>
              )
            ) : (
              <Link to={"/create-shop"} className="flex-1">
                <Button className="cursor-pointer w-full h-14 sm:h-16 text-lg sm:text-xl font-medium bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-white text-primary border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-2xl">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Become a Seller
                </Button>
              </Link>
            )}

            <Link to={"/all-products"} className="flex-1">
              <Button className="w-full h-14 sm:h-16 text-lg sm:text-xl font-medium bg-transparent hover:bg-white/12 text-white border border-white/30 hover:border-white/45 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 rounded-2xl backdrop-blur-sm">
                <ArrowRight className="mr-2 h-5 w-5" />
                Start Shopping
              </Button>
            </Link>
          </div>

          {/* Bottom accent */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
