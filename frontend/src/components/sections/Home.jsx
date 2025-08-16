import { useSelector } from "react-redux";

import {
  BestSelling,
  Categories,
  FeaturedProducts,
  Slider,
} from "@/components";
import PopularEvents from "@/components/sections/PopularEvents";
import SearchDetails from "../SearchDetails";

const Home = () => {
  const { searchProducts } = useSelector((state) => state.product);

  return (
    <div className="relative  ">
      <div>
        <Slider />
        <Categories />
        <BestSelling limit={5} />
        <PopularEvents />
        <FeaturedProducts />
      </div>
    </div>
  );
};

export default Home;
