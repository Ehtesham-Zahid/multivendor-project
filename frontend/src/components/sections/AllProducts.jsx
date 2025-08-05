import { useEffect } from "react";
import ProductCard from "../ProductCard";
import { getAllProductsThunk } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { all } from "axios";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading, error } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(getAllProductsThunk());
  }, []);

  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        All Products
      </p>
      <div className="grid grid-cols-5 gap-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : allProducts.length === 0 ? (
          <p>No products available</p>
        ) : (
          allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default AllProducts;
