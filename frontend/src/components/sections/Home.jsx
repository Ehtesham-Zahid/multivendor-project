import { useSelector } from "react-redux";

import {
  BestSelling,
  Categories,
  FeaturedProducts,
  Slider,
} from "@/components";
import PopularEvents from "@/components/sections/PopularEvents";
import FeaturesSection from "./FeaturesSection";

const Home = () => {
  return (
    <div className="relative  ">
      <div>
        <Slider />
        <Categories />
        <BestSelling limit={5} />
        <PopularEvents />
        <FeaturedProducts />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Home;
