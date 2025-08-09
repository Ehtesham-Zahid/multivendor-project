import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { getAllProductsThunk } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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
  const { allProducts, isLoading, error, totalPages } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    // Fetch all products when the component mounts
    dispatch(getAllProductsThunk({ page, limit }));
  }, [dispatch, page, limit]);

  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        All Products
      </p>
      <div>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>{error}</p>
        ) : allProducts?.length === 0 ? (
          <p>No products available</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-5 justify-around md:justify-start">
              {allProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={() => setPage(index + 1)}
                          className={page === index + 1 ? "active" : ""}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={() =>
                          setPage((prev) => Math.min(prev + 1, totalPages))
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
