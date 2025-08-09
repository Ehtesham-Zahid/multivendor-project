import { useDispatch } from "react-redux";
import {
  BestSelling,
  Categories,
  FeaturedProducts,
  Slider,
} from "../components";
import PopularEvents from "../components/sections/PopularEvents";
import { getCart } from "../features/cart/cartSlice";
import { getWishlist } from "../features/wishlist/wishlistSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getCart());
  }, [dispatch]);

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
