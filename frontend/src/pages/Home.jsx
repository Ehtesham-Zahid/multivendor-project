import {
  BestSelling,
  Categories,
  FeaturedProducts,
  Slider,
} from "../components";
import PopularEvents from "../components/sections/PopularEvents";

const Home = () => {
  return (
    <div>
      <Slider />
      <Categories />
      <BestSelling limit={5} />
      <PopularEvents />
      <FeaturedProducts />
    </div>
  );
};

export default Home;
