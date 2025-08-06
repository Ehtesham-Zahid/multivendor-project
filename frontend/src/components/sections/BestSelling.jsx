import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import { useEffect, useState } from "react";
import { getAllProductsThunk } from "../../features/product/productSlice";
import Spinner from "../Spinner";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shadcn/pagination";

const BestSelling = ({ limit }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { bestSellingProducts, isLoading, totalPages } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    console.log(limit);
    if (limit) {
      dispatch(getAllProductsThunk({ sortBy: "sales", limit, page }));
    }
  }, [limit, dispatch, page]);

  return (
    <section className="w-custom m-auto">
      <p className="text-start text-4xl font-black tracking-wide mt-20 mb-10">
        Best Selling
      </p>
      <div className="grid grid-cols-5 gap-8">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {bestSellingProducts?.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}{" "}
            {limit !== 5 && totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center col-span-full">
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

export default BestSelling;
