import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/tabs";
import ProductCard from "./ProductCard";
import EventCard from "./EventCard";
import { Button } from "../shadcn/button";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router";
import { getShopReviewsThunk } from "../features/review/reviewSlice";
import { useEffect } from "react";
import ReviewCard from "./ReviewCard";

const ShopDetails = ({ shop }) => {
  const { shopReviews } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopReviewsThunk(shop?._id));
  }, [shop?._id]);

  return (
    <Tabs
      defaultValue="shopProducts"
      className="w-full min-h-[620px] bg-background rounded-md shadow-2xl "
    >
      <TabsList
        className={
          "md:gap-1.5 flex lg:flex-row flex-col w-full    h-fit lg:justify-between"
        }
      >
        <div className="flex flex-col lg:flex-row gap-2 h-fit w-full lg:w-fit">
          <TabsTrigger
            value="shopProducts"
            className="cursor-pointer rounded-none border-b-2 border-b-primary text-md p-3 lg:p-5 w-full lg:w-44"
          >
            Shop Products
          </TabsTrigger>
          <TabsTrigger
            value="currentEvents"
            className="cursor-pointer rounded-none border-b-2 border-b-primary text-md p-3 lg:p-5 w-full lg:w-44"
          >
            Current Events
          </TabsTrigger>
          <TabsTrigger
            value="shopReviews"
            className="cursor-pointer rounded-none border-b-2 border-b-primary text-md p-3 lg:p-5 w-full lg:w-44"
          >
            Shop Reviews
          </TabsTrigger>
        </div>
        <Button
          className="w-full lg:w-fit text-md text-white mt-3 lg:mt-0 lg:mr-2 "
          size={"lg"}
          asChild
        >
          <Link to={`/dashboard`}>
            Dashboard <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </Button>
      </TabsList>

      <TabsContent value="shopProducts" className="p-5">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {shop?.products?.map((product) => (
            <ProductCard key={product._id} product={product} small={true} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="currentEvents">
        {shop?.events?.map((event) => (
          <EventCard key={event._id} event={event} small={true} />
        ))}
      </TabsContent>
      <TabsContent value="shopReviews">
        {shopReviews?.length > 0 ? (
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start p-3">
            {shopReviews?.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews yet</p>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default ShopDetails;
