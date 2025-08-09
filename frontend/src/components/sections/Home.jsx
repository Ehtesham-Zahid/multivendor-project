import { useDispatch, useSelector } from "react-redux";
import {
  BestSelling,
  Categories,
  FeaturedProducts,
  Slider,
} from "@/components";
import PopularEvents from "@/components/sections/PopularEvents";
import { getCart } from "@/features/cart/cartSlice";
import { getWishlist } from "@/features/wishlist/wishlistSlice";
import { useEffect } from "react";
import SearchDetails from "../SearchDetails";

const Home = () => {
  const { searchProducts } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className="relative  ">
      {searchProducts?.length > 0 && <SearchDetails />}
      <div>
        <Slider />
        <Categories />
        <BestSelling limit={5} />
        <PopularEvents />
        {/*   <FeaturedProducts /> */}
      </div>
    </div>
  );
};

export default Home;
