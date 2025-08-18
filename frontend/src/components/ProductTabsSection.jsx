import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/tabs";
import { AlignCenter, PaintBucket, Star } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Button } from "../shadcn/button";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import { formatDate } from "../utils";

const ProductTabsSection = ({ product, shop }) => {
  const [activeTab, setActiveTab] = useState("product-details");
  const { productReviews, isLoading } = useSelector((state) => state.review);

  return (
    <Tabs
      defaultValue="product-details"
      className="w-11/12 md:w-5/6 lg:w-4/5 xl:w-2/3 mx-auto  mb-20 min-h-[400px] h-fit"
      onValueChange={setActiveTab}
    >
      <TabsList className="flex flex-col md:flex-row gap-2 h-fit w-full">
        <TabsTrigger
          value="product-details"
          //   onClick={() => setActiveTab("product-details")}
          className={`text-dark p-3 text-xl rounded-md font-bold w-full   ${
            activeTab === "product-details"
              ? "data-[state=active]:bg-primary data-[state=active]:text-white"
              : "bg-primary/10 text-dark"
          }`}
        >
          Product Details
        </TabsTrigger>
        <TabsTrigger
          value="product-reviews"
          //   onClick={() => setActiveTab("product-reviews")}
          className={`text-dark p-3 text-xl rounded-md font-bold w-full ${
            activeTab === "product-reviews"
              ? "data-[state=active]:bg-primary data-[state=active]:text-white"
              : "bg-primary/10 text-dark"
          } `}
        >
          Reviews
        </TabsTrigger>
        <TabsTrigger
          value="shop-information"
          //   onClick={() => setActiveTab("shop-information")}
          className={`text-dark p-3 text-xl rounded-md font-bold w-full  ${
            activeTab === "shop-information"
              ? "data-[state=active]:bg-primary data-[state=active]:text-white"
              : "bg-primary/10 text-dark"
          }`}
        >
          Shop Information
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="product-details"
        className="bg-background shadow-2xl p-5 mt-5 "
      >
        <p className="text-3xl font-bold ">Product Description</p>
        <p className="text-lg mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
        <div className="flex flex-col md:flex-row gap-5 mt-5  ">
          <div className="flex flex-col gap-2 bg-primary/10 p-5 rounded-lg w-full md:w-1/2">
            <p className="text-lg font-bold text-sky-600">Product Details</p>
            <p className="text-md text-sky-600 font-normal   ">
              Category: {product?.category}
            </p>
            <p className="text-md text-sky-600 font-normal">
              Stock: {product?.stock}
            </p>
            <p className="text-md text-sky-600 font-normal">
              Rating: {product?.rating}
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-yellow-50 p-5 rounded-lg w-full md:w-1/2">
            <p className="text-lg font-bold text-yellow-600">
              Sales Information
            </p>
            <p className="text-md text-yellow-600 font-normal   ">
              Total Sales: {product?.sold} items
            </p>
            <p className="text-md text-yellow-600 font-normal">
              Average Rating: {product?.rating}
            </p>
            <p className="text-md text-yellow-600 font-normal">
              Reviews: {product?.totalReviews} reviews
            </p>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="product-reviews"
        className="bg-background shadow-2xl p-5 mt-5 "
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex items-center gap-2 justify-center h-full   flex-col  ">
            {productReviews.length > 0 ? (
              productReviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <div className="flex items-center gap-2 justify-center h-full   flex-col  ">
                <AlignCenter size={50} className="text-gray-500   " />
                <p className="text-lg font-bold ">No Reviews yet</p>
                <p className="text-md font-normal text-gray-500">
                  Be the first to review this product!
                </p>
              </div>
            )}
          </div>
        )}
      </TabsContent>
      <TabsContent
        value="shop-information"
        className="bg-background shadow-2xl p-5 mt-5 flex flex-col md:flex-row gap-3  "
      >
        <div className="flex   gap-5 bg-primary/10  rounded-lg w-full h-fit p-5 sm:p-8  ">
          <img
            src={shop?.imageUrl}
            alt="logo"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-sky-600">{shop?.shopName}</p>
            <div className="flex text-sm gap-1 items-center">
              {Array.from({ length: 5 }, (_, index) => {
                const full = index + 1 <= shop?.rating;
                const half = index < shop?.rating && shop?.rating < index + 1;

                return (
                  <div key={index} className="relative">
                    {/* Empty star */}
                    <Star size={16} className="text-gray-300" fill="none" />
                    {/* Full star */}
                    {full && (
                      <Star
                        size={16}
                        className="text-yellow-500 absolute top-0 left-0"
                        fill="currentColor"
                      />
                    )}
                    {/* Half star */}
                    {half && (
                      <Star
                        size={16}
                        className="text-yellow-500 absolute top-0 left-0"
                        fill="currentColor"
                        style={{ clipPath: "inset(0 50% 0 0)" }}
                      />
                    )}
                  </div>
                );
              })}
              <p className="text-md font-normal ml-1">
                {shop?.rating?.toFixed(1)} rating
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between bg-primary/10 p-5 rounded-lg w-full ">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-sky-600">Shop Statistics</p>
            <div className="flex flex-col gap-2">
              <p className="text-md text-sky-600 font-normal   ">
                Joined: {formatDate(shop?.createdAt)}
              </p>
              <p className="text-md text-sky-600 font-normal   ">
                Total Products: {shop?.products?.length}
              </p>
              <p className="text-md text-sky-600 font-normal   ">
                Total Reviews: {shop?.totalReviews}
              </p>
            </div>
          </div>
          <Button
            className="w-full bg-primary text-white  text-md  cursor-pointer"
            size={"lg"}
          >
            View Shop
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabsSection;
