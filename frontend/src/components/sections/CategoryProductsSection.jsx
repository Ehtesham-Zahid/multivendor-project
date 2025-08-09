import ProductCard from "../ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  getAllProductsThunk,
  getProductsByCategoryThunk,
} from "../../features/product/productSlice";
import Spinner from "../Spinner";

import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/pagination";

const CategoryProductsSection = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { categoryProducts, isLoading, error, totalPages } = useSelector(
    (state) => state.product
  );
  useEffect(() => {
    // Dispatch the getProductsByCategoryThunk action with the category as an argument
    dispatch(getAllProductsThunk({ category, page, limit }));
  }, [category, dispatch, page, limit]);

  return (
    <section className="w-custom m-auto h-full">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        {category}
      </p>
      <div>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : categoryProducts.length === 0 ? (
          <p className="text-center uppercase text-black text-2xl  font-bold absolute  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            No products found in this category
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-5 justify-around md:justify-start">
              {categoryProducts.map((product) => (
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

export default CategoryProductsSection;
