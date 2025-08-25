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
