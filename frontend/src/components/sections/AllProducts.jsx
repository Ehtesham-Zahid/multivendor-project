import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { getAllProductsThunk } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/pagination";
import Spinner from "../Spinner";
const AllProducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { allProducts, isAllProductsLoading, error, totalAllProductsPages } =
    useSelector((state) => state.product);
  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(getAllProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <section className="w-custom m-auto">
      <p className="text-start sm:text-4xl text-3xl font-black tracking-wide mt-20 mb-10">
        All Products
      </p>
      <div>
        {isAllProductsLoading ? (
          <div className="flex justify-center items-center h-full w-full pt-20">
            <Spinner />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : allProducts?.length === 0 ? (
          <p>No products available</p>
        ) : (
          <>
            {/* <div className="flex flex-wrap gap-5  justify-center md:justify-between "> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {allProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {totalAllProductsPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      />
                    </PaginationItem>
                    {Array.from(
                      { length: totalAllProductsPages },
                      (_, index) => (
                        <PaginationItem key={index}>
                          <PaginationLink
                            href="#"
                            onClick={() => setPage(index + 1)}
                            className={page === index + 1 ? "active" : ""}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setPage((prev) =>
                            Math.min(prev + 1, totalAllProductsPages)
                          )
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllProducts;
