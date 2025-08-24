import { useDispatch, useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { Link } from "react-router";
import { Button } from "../shadcn/button";
import Spinner from "./Spinner";
import { setSearchTermReducer } from "../features/product/productSlice";

const SidebarSearchDetails = () => {
  const { searchBarProducts, searchTerm, isSearchBarProductsLoading } =
    useSelector((state) => state.product);
  const dispatch = useDispatch();
  return (
    <div className="absolute  lg:hidden w-11/12  top-32 left-1/2 -translate-x-1/2  mx-auto  shadow-lg rounded-lg z-[9999] h-fit     bg-white ">
      <div className="flex flex-col gap-2 p-3">
        <p className="text-md text-black font-semibold">Search Results</p>
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
      </div>{" "}
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

export default SidebarSearchDetails;
