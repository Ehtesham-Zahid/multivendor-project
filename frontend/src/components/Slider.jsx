// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import SliderImage1 from "../assets/images/slider-1.jpg";
import SliderImage2 from "../assets/images/slider-2.jpg";

import "./index.css";
import { Button } from "../shadcn/button";

const Slider = () => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        className="h-[750px] [&_.swiper-pagination-bullet]:!bg-gray-400 [&_.swiper-pagination-bullet-active]:!bg-background [&_.swiper-pagination-bullet]:p-1.5"
      >
        {/* Slide 1 */}
        <SwiperSlide className="slider-1 p-2">
          <div className="flex flex-col justify-center items-center w-full h-full gap-y-10">
            <p className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-center max-[500px]:w-full w-5/6 sm:w-3/4 lg:w-2/3 2xl:w-1/2 text-white">
              Your One-Stop Shop For
              <span className="text-primary"> Everything</span> Online
            </p>
            <p className="text-md sm:text-lg lg:text-xl w-5/6 sm:w-2/3 lg:w-1/2 xl:w-2/5 text-center font-semibold text-white">
              Discover unbeatable deals on electronics, fashion, and more. Enjoy
              secure payments, fast delivery, and 24/7 support at Buyno. Start
              Shopping
            </p>
            <Button
              className="text-white cursor-pointer text-lg py-6"
              size="lg"
            >
              Start Shopping
            </Button>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="slider-1 p-2">
          <div className="flex flex-col justify-center items-center w-full h-full gap-y-10">
            <p className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-center max-[500px]:w-full w-5/6 sm:w-3/4 lg:w-2/3 2xl:w-1/2 text-white">
              Hot Deals On <span className="text-primary">Top Brands</span>
            </p>
            <p className="text-md sm:text-lg lg:text-xl w-5/6 sm:w-2/3 lg:w-1/2 xl:w-2/5 text-center font-semibold text-white">
              Save big on the brands you love. From Apple to Nike — enjoy
              discounts, quality, and style all in one place.
            </p>
            <Button
              className="text-white cursor-pointer text-lg py-6"
              size="lg"
            >
              Shop Deals
            </Button>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="slider-1 p-2">
          <div className="flex flex-col justify-center items-center w-full h-full gap-y-10">
            <p className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-center max-[500px]:w-full w-5/6 sm:w-3/4 lg:w-2/3 2xl:w-1/2 text-white">
              Fresh Finds For <span className="text-primary">Every Season</span>
            </p>
            <p className="text-md sm:text-lg lg:text-xl w-5/6 sm:w-2/3 lg:w-1/2 xl:w-2/5 text-center font-semibold text-white">
              Stay ahead with the latest arrivals in fashion, tech, and home
              essentials — curated just for you.
            </p>
            <Button
              className="text-white cursor-pointer text-lg py-6"
              size="lg"
            >
              Explore Now
            </Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
