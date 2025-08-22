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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
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
