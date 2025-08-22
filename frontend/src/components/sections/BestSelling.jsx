import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import {
  getBestSellingProductsHomepageThunk,
  getBestSellingProductsThunk,
} from "../../features/product/productSlice";
import Spinner from "../Spinner";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/pagination";

const BestSelling = ({ limit }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const {
    bestSellingProductsHomepage,
    bestSellingProducts,
    isBestSellingProductsHomePageLoading,
    isBestSellingProductsLoading,
    totalBestSellingPages,
  } = useSelector((state) => state.product);

  useEffect(() => {
    if (limit === 5) {
      dispatch(getBestSellingProductsHomepageThunk({ limit, page }));
    } else {
      dispatch(getBestSellingProductsThunk({ limit, page }));
    }
  }, [limit, dispatch, page]);

  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Best Selling
      </p>
      <div className=" ">
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
            {limit === 5 && isBestSellingProductsHomePageLoading ? (
              <Spinner />
            ) : limit === 5 && !isBestSellingProductsHomePageLoading ? (
              bestSellingProductsHomepage?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : isBestSellingProductsLoading ? (
              <Spinner />
            ) : (
              bestSellingProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
          {limit !== 5 && totalBestSellingPages > 1 && (
            <div className="mt-10 flex justify-center items-center col-span-full">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalBestSellingPages }, (_, index) => (
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
                          Math.min(prev + 1, totalBestSellingPages)
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default BestSelling;
