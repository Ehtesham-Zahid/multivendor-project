import React from "react";
import { Button } from "@/shadcn/button";
import { ArrowRight, ShoppingBag, Star, Users, Truck } from "lucide-react";
import { Link } from "react-router";

import Lottie from "lottie-react";
import shoppingAnimation from "../../assets/lotties/home.json";

const HomeSection = () => {
  return (
    <div className=" bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <section className="relative min-h-screen overflow-hidden py-10 lg:py-0 max-w-custom mx-auto">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] bg-gradient-to-r from-primary/3 to-blue-500/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center min-h-[85vh] gap-6 sm:gap-8 md:gap-12 lg:gap-20 pt-0 sm:pt-2 lg:pt-4">
            {/* Left Side - Content */}
            <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 w-full">
              {/* Main Heading */}
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl   xl:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-[1.2] px-2 sm:px-0">
                  Your Ultimate
                  <span className="block bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent mt-1 sm:mt-2">
                    Shopping Destination
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-xl 2xl:text-2xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
                  Discover amazing products from trusted vendors, enjoy seamless
                  shopping, and get the best deals delivered to your doorstep.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className=" flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white border-2 border-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                  asChild
                >
                  <Link to="/all-products">
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-6 text-base sm:text-lg md:text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                  asChild
                >
                  <Link to="/auth/register">
                    Join as Vendor
                    <ShoppingBag className="ml-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </Link>
                </Button>
              </div>

              {/* Stats/Features */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mx-0 px-4 sm:px-0">
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900">
                    10K+
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Happy Customers
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900">
                    500+
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <Truck className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-primary" />
                  </div>
                  <p className="text-sm sm:text-lg md:text-2xl font-bold text-gray-900">
                    24/7
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Support</p>
                </div>
              </div>
            </div>

            {/* Right Side - Lottie Animation Placeholder */}
            <div className="flex-1 flex justify-center lg:justify-end w-full mt-6 sm:mt-8 md:mt-10 lg:mt-0">
              <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl px-4 sm:px-0">
                {/* Lottie Animation Container */}
                <div className="relative bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-lg sm:shadow-xl md:shadow-2xl border border-white/20">
                  <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[450px] bg-gradient-to-br from-primary/10 via-blue-500/10 to-indigo-500/10 rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center">
                    <Lottie
                      animationData={shoppingAnimation}
                      loop={true}
                      autoplay={true}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Floating elements around the animation */}
                  <div className="absolute -top-1 sm:-top-2 md:-top-4 -right-1 sm:-right-2 md:-right-4 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Star className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white fill-current" />
                  </div>
                  <div className="absolute -bottom-1 sm:-bottom-2 md:-bottom-4 -left-1 sm:-left-2 md:-left-4 w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-primary rounded-full shadow-lg" />
                  <div className="absolute top-1/2 -right-2 sm:-right-3 md:-right-6 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-blue-500 rounded-full shadow-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="w-full h-16 sm:h-20 text-white"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="currentColor"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.71,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="currentColor"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
