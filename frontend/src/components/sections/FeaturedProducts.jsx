import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "../ProductCard";
import { getFeaturedProductsThunk } from "../../features/product/productSlice";
import Spinner from "../Spinner";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { featuredProducts, isFeaturedProductsLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getFeaturedProductsThunk({ limit: 5 }));
  }, [dispatch]);

  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Featured Products
      </p>
      <div className="flex flex-wrap gap-5 justify-center md:justify-between ">
        {isFeaturedProductsLoading ? (
          <Spinner />
        ) : (
          <>
            {featuredProducts?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
