import React, { useState, useEffect } from "react";
import {
  BestSelling,
  Categories,
  FeaturedProducts,
  Slider,
} from "@/components";
import PopularEvents from "@/components/sections/PopularEvents";
import FeaturesSection from "./FeaturesSection";
import CtaSection from "./CtaSection";
import HomeSection from "./HomeSection";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-background">
        {/* Loading skeleton */}
        <div className="w-custom m-auto pt-20">
          <div className="animate-pulse">
            {/* HomeSection skeleton */}
            <div className="h-96 bg-gray-200 rounded-lg mb-20"></div>

            {/* Categories skeleton */}
            <div className="mb-10">
              <div className="h-12 bg-gray-200 rounded w-80 mb-10"></div>
              <div className="grid max-[500px]:grid-cols-1 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-72 bg-gray-200 rounded-md"
                  ></div>
                ))}
              </div>
            </div>

            {/* BestSelling skeleton */}
            <div className="mb-20">
              <div className="h-12 bg-gray-200 rounded w-64 mb-10"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-80 bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div>
        {/* <Slider /> */}
        <HomeSection />
        <Categories />
        <BestSelling limit={5} />
        <PopularEvents />
        <FeaturedProducts />
        <FeaturesSection />
        <CtaSection />
      </div>
    </div>
  );
};

export default Home;
