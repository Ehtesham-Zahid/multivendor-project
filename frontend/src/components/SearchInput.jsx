import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useDebounce } from "react-use";
import {
  getAllProductsThunk,
  setSearchTermReducer,
} from "../features/product/productSlice";

const SearchInput = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      dispatch(getAllProductsThunk({ search: debouncedSearchTerm, limit: 5 }));
      dispatch(setSearchTermReducer(debouncedSearchTerm));
    } else {
      dispatch(setSearchTermReducer(""));
      dispatch(getAllProductsThunk({}));
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="lg:w-1/2 w-full border-2  border-primary outline-none flex justify-center  rounded-md px-5 py-2 mx-auto">
      <input
        type="text"
        placeholder="Search for Products"
        name="search"
        id="search"
        className="w-full outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="border-s-2 border-primary ps-3 font text-dark cursor-pointer">
        <Search strokeWidth={3} color="#1f2937" />
      </button>
    </div>
  );
};

export default SearchInput;
