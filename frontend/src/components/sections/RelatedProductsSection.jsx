import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getRelatedProductsThunk } from "../../features/product/productSlice";
import Spinner from "../Spinner";

import { useEffect } from "react";

const RelatedProductsSection = ({ category }) => {
  const dispatch = useDispatch();
  const { relatedProducts, isRelatedProductsLoading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getRelatedProductsThunk({ category }));
  }, [category, dispatch]);

  return (
    <section className="w-custom m-auto h-full mb-20">
      <p className="text-start sm:text-4xl text-3xl font-black tracking-wide mt-20 mb-10">
        Related Products
      </p>
      <div>
        {isRelatedProductsLoading ? (
          <div className="flex justify-center items-center h-full w-full pt-20">
            <Spinner />
          </div>
        ) : relatedProducts.length === 0 ? (
          <p className="text-center uppercase text-black text-2xl  font-bold    pt-20 ">
            No related products found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedProductsSection;
