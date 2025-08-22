import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { Loader2, Plus, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../features/review/reviewSlice";
import { toast } from "react-toastify";
import { getShopOrderByIdThunk } from "../features/order/orderSlice";

const CreateReviewDialog = ({ productId, shopId, trigger, orderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(1);
  const [hoveredRating, setHoveredRating] = useState(0);

  const { createReviewLoading, error } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleRatingHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`cursor-pointer transition-colors duration-200 ${
            i <= (hoveredRating || rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          } hover:scale-110`}
          size={28}
          onClick={() => handleRatingClick(i)}
          onMouseEnter={() => handleRatingHover(i)}
          onMouseLeave={handleRatingLeave}
        />
      );
    }
    return stars;
  };

  const onSubmit = async (data) => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!productId || !shopId) {
      toast.error("Product and shop information is required");
      return;
    }

    const payload = {
      rating,
      comment: data.comment,
      productId,
      shopId,
    };

    try {
      const resultAction = await dispatch(createReviewThunk(payload));

      if (createReviewThunk.fulfilled.match(resultAction)) {
        toast.success("Review Created Successfully!");
        setIsOpen(false);
        setRating(1);
        reset();
        dispatch(getShopOrderByIdThunk(orderId));
      } else {
        toast.error("Failed to create review: " + resultAction.error.message);
      }
    } catch (err) {
      toast.error("Error creating review");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="w-fit">
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-primary text-white text-md" size="lg">
            Write Review <Plus />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-sm md:w-md lg:w-lg max-h-screen h-fit overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold text-start text-lg sm:text-xl">
            Write a Review
          </DialogTitle>
          <form
            className="flex flex-col gap-3 sm:gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Rating Field */}
            <div className="flex flex-col">
              <label className="text-sm text-start font-bold text-zinc-600 mb-1">
                Rating *
              </label>
              <div className="flex items-center gap-2">
                {renderStars()}
                <span className="ml-2 text-sm text-zinc-500">
                  {rating > 0 ? `${rating}/5` : "Select rating"}
                </span>
              </div>
              {rating === 0 && (
                <span className="text-red-500 text-sm font-semibold mt-1">
                  Please select a rating
                </span>
              )}
            </div>

            {/* Comment Field */}
            <div className="flex flex-col">
              <label className="text-sm text-start font-bold text-zinc-600 mb-1">
                Comment *
              </label>
              <textarea
                className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base min-h-[100px] resize-none"
                placeholder="Share your experience with this product..."
                {...register("comment", {
                  required: "Comment is required",
                  minLength: {
                    value: 10,
                    message: "Comment must be at least 10 characters long",
                  },
                  maxLength: {
                    value: 500,
                    message: "Comment cannot exceed 500 characters",
                  },
                })}
              />
              {errors.comment && (
                <span className="text-red-500 text-sm font-semibold">
                  {errors.comment.message}
                </span>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <span className="text-red-500 text-sm font-semibold">
                {error}
              </span>
            )}

            {/* Submit Button */}
            <Button
              disabled={createReviewLoading}
              type="submit"
              className="text-white text-md mt-3"
            >
              {createReviewLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <p>Submit Review</p>
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReviewDialog;
