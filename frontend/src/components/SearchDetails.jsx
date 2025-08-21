import { useDispatch, useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { Link } from "react-router";
import { Button } from "../shadcn/button";
import Spinner from "./Spinner";
import { setSearchTermReducer } from "../features/product/productSlice";

const SearchDetails = () => {
  const dispatch = useDispatch();
  const { searchBarProducts, searchTerm, isSearchBarProductsLoading } =
    useSelector((state) => state.product);
  return (
    <div className="absolute hidden ml-9 lg:block  top-20 left-1/2 -translate-x-1/2  mx-auto bg-white shadow-lg rounded-lg z-[9999] h-fit lg:w-[47vw] w-full    ">
      <div className="flex flex-col gap-2 p-5">
        <p className="text-lg text-black font-semibold">Search Results</p>
        <div className="flex flex-wrap   justify-center">
          {isSearchBarProductsLoading ? (
            <Spinner />
          ) : searchBarProducts?.length === 0 ? (
            <p className="text-gray-500 font-semibold">No products found</p>
          ) : (
            searchBarProducts?.map((product) => (
              <SearchCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      <div className="flex justify-center py-3">
        {searchBarProducts?.length > 0 && (
          <Link
            to={`/search/${searchTerm}`}
            onClick={() => dispatch(setSearchTermReducer(""))}
          >
            <Button className="mx-auto bg-primary text-white text-md cursor-pointer">
              See All
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchDetails;
