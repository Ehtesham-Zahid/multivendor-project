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
      {" "}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        pagination={{ clickable: true }}
        className="h-[750px] [&_.swiper-pagination-bullet]:!bg-gray-400 [&_.swiper-pagination-bullet-active]:!bg-background [&_.swiper-pagination-bullet]:p-1.5"
      >
        <SwiperSlide className="slider-1 ">
          <div className=" flex flex-col justify-center items-center w-full h-full gap-y-10">
            <p className="text-7xl font-black text-center w-1/2 text-white">
              Your One-Stop Shop For
              <span className="text-primary"> Everything</span> Online
            </p>
            <p className="text-xl w-2/5 text-center font-semibold text-white">
              Discover unbeatable deals on electronics, fashion, and more. Enjoy
              secure payments, fast delivery, and 24/7 support at Buyno. Start
              Shopping
            </p>
            <Button
              className="text-white cursor-pointer text-lg py-6"
              size={"lg"}
            >
              Start Shopping
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-2">
          <div className=" flex flex-col justify-center items-center w-full h-full gap-y-10">
            <p className="text-7xl font-black text-center w-1/2 text-white">
              Your One-Stop Shop For
              <span className="text-dark"> Everything</span> Online
            </p>
            <p className="text-xl w-2/5 text-center font-semibold text-dark">
              Discover unbeatable deals on electronics, fashion, and more. Enjoy
              secure payments, fast delivery, and 24/7 support at Buyno. Start
              Shopping
            </p>
            <Button
              className="text-white cursor-pointer text-lg py-6"
              size={"lg"}
            >
              Start Shopping
            </Button>
          </div>
        </SwiperSlide>
        <SwiperSlide className="slider-3">
          <div className=" flex flex-col justify-center items-center w-full h-full gap-y-10">
            <p className="text-7xl font-black text-center w-1/2 text-white">
              Your One-Stop Shop For
              <span className="text-dark"> Everything</span> Online
            </p>
            <p className="text-xl w-2/5 text-center font-semibold text-dark">
              Discover unbeatable deals on electronics, fashion, and more. Enjoy
              secure payments, fast delivery, and 24/7 support at Buyno. Start
              Shopping
            </p>
            <Button
              className="text-white cursor-pointer text-lg py-6"
              size={"lg"}
            >
              Start Shopping
            </Button>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
