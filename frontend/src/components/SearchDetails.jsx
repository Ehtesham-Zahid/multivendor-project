// import React from "react";
// import { useSelector } from "react-redux";
// import SearchCard from "./SearchCard";
// import { Button } from "../shadcn/button";
// import { Link } from "react-router";

// const SearchDetails = () => {
//   const { searchProducts, searchTerm } = useSelector((state) => state.product);
//   return (
//     <div className="absolute  -top-20 left-1/2 -translate-x-1/2  mx-auto bg-white shadow-lg rounded-lg z-[9999] h-[400px] lg:w-full w-full border-y-2 rounded-t-none border-dark">
//       <div className=" w-fit mx-auto">
//         <div className="flex flex-col gap-2 p-5">
//           <p className="text-lg text-black font-semibold">Search Results</p>
//           <div className="flex flex-wrap gap-8 justify-center">
//             {searchProducts?.length > 0 &&
//               searchProducts?.map((product) => (
//                 <SearchCard key={product._id} product={product} />
//               ))}
//             {searchProducts?.length === 0 && (
//               <p className="text-gray-500 font-semibold">No products found</p>
//             )}
//           </div>
//         </div>
//         <div className="flex justify-center pt-20">
//           <Link to={`/search/${searchTerm}`}>
//             <Button
//               className="mx-auto bg-primary text-white text-md cursor-pointer"
//               size={"lg"}
//             >
//               See All
//             </Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchDetails;

import { useSelector } from "react-redux";
import SearchCard from "./SearchCard";
import { Link } from "react-router";
import { Button } from "../shadcn/button";

const SearchDetails = () => {
  const { searchProducts, searchTerm } = useSelector((state) => state.product);
  return (
    <div className="absolute hidden lg:block  top-20 left-1/2 -translate-x-1/2  mx-auto bg-white shadow-lg rounded-lg z-[9999] h-fit lg:w-[47vw] w-full    ">
      <div className="flex flex-col gap-2 p-5">
        <p className="text-lg text-black font-semibold">Search Results</p>
        <div className="flex flex-wrap   justify-center">
          {searchProducts?.length > 0 &&
            searchProducts?.map((product) => (
              <SearchCard key={product._id} product={product} />
            ))}
        </div>
      </div>
      <div className="flex justify-center py-3">
        <Link to={`/search/${searchTerm}`}>
          <Button className="mx-auto bg-primary text-white text-md cursor-pointer">
            See All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchDetails;
