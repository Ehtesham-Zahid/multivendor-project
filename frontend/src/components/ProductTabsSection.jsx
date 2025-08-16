import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/tabs";
import { AlignCenter, PaintBucket, Star } from "lucide-react";
import { useState } from "react";
import Logo from "../assets/images/logo.png";
import { Button } from "../shadcn/button";

const ProductTabsSection = () => {
  const [activeTab, setActiveTab] = useState("product-details");
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
              Category: Electronics
            </p>
            <p className="text-md text-sky-600 font-normal">Stock: 100</p>
            <p className="text-md text-sky-600 font-normal">Rating: 4.5</p>
          </div>
          <div className="flex flex-col gap-2 bg-yellow-50 p-5 rounded-lg w-full md:w-1/2">
            <p className="text-lg font-bold text-yellow-600">
              Sales Information
            </p>
            <p className="text-md text-yellow-600 font-normal   ">
              Total Sales: 100 items
            </p>
            <p className="text-md text-yellow-600 font-normal">
              Average Rating: No ratings
            </p>
            <p className="text-md text-yellow-600 font-normal">
              Reviews: 0 reviews
            </p>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="product-reviews"
        className="bg-background shadow-2xl p-5 mt-5 "
      >
        <div className="flex items-center gap-2 justify-center h-full   flex-col  ">
          <AlignCenter size={50} className="text-gray-500   " />
          <p className="text-lg font-bold ">No Reviews yet</p>
          <p className="text-md font-normal text-gray-500">
            Be the first to review this product!
          </p>
        </div>
      </TabsContent>
      <TabsContent
        value="shop-information"
        className="bg-background shadow-2xl p-5 mt-5 flex flex-col md:flex-row gap-3  "
      >
        <div className="flex   gap-5 bg-primary/10  rounded-lg w-full h-fit p-5 sm:p-8  ">
          <img src={Logo} alt="logo" className="w-16 h-16 rounded-full" />
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-sky-600">Toy Story Store</p>
            <div className={`flex text-sm gap-1 items-center  `}>
              <Star size={`16px`} />
              <Star size={`16px`} />
              <Star size={`16px`} />
              <Star size={`16px`} />
              <Star size={`16px`} />
              <p className="text-md font-normal ml-1">4.75 rating</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-between bg-primary/10 p-5 rounded-lg w-full ">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold text-sky-600">Shop Statistics</p>
            <div className="flex flex-col gap-2">
              <p className="text-md text-sky-600 font-normal   ">
                Total Products: 1000
              </p>
              <p className="text-md text-sky-600 font-normal   ">
                Total Orders: 1000
              </p>
              <p className="text-md text-sky-600 font-normal   ">
                Total Revenue: 100
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
