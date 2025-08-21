import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "react-use";
import {
  getSearchBarProductsThunk,
  setSearchBarProductsReducer,
  setSearchTermReducer,
} from "../features/product/productSlice";

const SearchInput = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { searchTerm } = useSelector((state) => state.product);
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(
        getSearchBarProductsThunk({
          search: debouncedSearchTerm,
          limit: 5,
          // page: 1,
        })
      );
      dispatch(setSearchTermReducer(debouncedSearchTerm));
    } else {
      dispatch(setSearchTermReducer(""));
      dispatch(setSearchBarProductsReducer([]));
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className="lg:w-[47vw] w-full border-2  border-primary outline-none flex justify-center  rounded-md px-5 py-2 mx-auto">
      <input
        type="text"
        placeholder="Search for Products"
        name="search"
        id="search"
        className="w-full outline-none"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTermReducer(e.target.value))}
      />
      <button className="border-s-2 border-primary ps-3 font text-dark cursor-pointer">
        <Search strokeWidth={3} color="#1f2937" />
      </button>
    </div>
  );
};

export default SearchInput;
