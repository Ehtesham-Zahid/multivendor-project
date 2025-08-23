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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/pagination";

const CategoryProductsSection = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { categoryProducts, isCategoryProductsLoading, totalCategoryPages } =
    useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsByCategoryThunk({ category, page, limit: 10 }));
  }, [category, dispatch, page]);

  return (
    <section className="w-custom m-auto h-full mb-20">
      <p className="text-start sm:text-4xl text-3xl font-black tracking-wide mt-20 mb-10">
        {category}
      </p>
      <div>
        {isCategoryProductsLoading ? (
          <div className="flex justify-center items-center h-full w-full pt-20">
            <Spinner />
          </div>
        ) : categoryProducts.length === 0 ? (
          <p className="text-center uppercase text-black text-2xl  font-bold    pt-20 ">
            No products found in this category
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
              {categoryProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            {totalCategoryPages > 1 && (
              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalCategoryPages }, (_, index) => (
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
                          setPage((prev) =>
                            Math.min(prev + 1, totalCategoryPages)
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

export default CategoryProductsSection;
