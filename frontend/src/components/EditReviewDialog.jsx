import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { Edit, Loader2, Star, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateReviewThunk,
  deleteReviewThunk,
} from "../features/review/reviewSlice";
import { toast } from "react-toastify";
import { getShopOrderByIdThunk } from "../features/order/orderSlice";

const EditReviewDialog = ({ review, trigger, orderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(review?.rating || 1);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { isLoading, error } = useSelector((state) => state.review);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Initialize form with current review data
  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setValue("comment", review.comment);
    }
  }, [review, setValue]);

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

    try {
      const payload = {
        rating,
        comment: data.comment,
      };

      const resultAction = await dispatch(
        updateReviewThunk({ reviewId: review._id, reviewData: payload })
      );

      if (updateReviewThunk.fulfilled.match(resultAction)) {
        toast.success("Review Updated Successfully!");
        setIsOpen(false);
        dispatch(getShopOrderByIdThunk(orderId));
      } else {
        toast.error("Failed to update review: " + resultAction.error.message);
      }
    } catch (err) {
      toast.error("Error updating review");
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this review? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      const resultAction = await dispatch(deleteReviewThunk(review._id));

      if (deleteReviewThunk.fulfilled.match(resultAction)) {
        toast.success("Review Deleted Successfully!");
        setIsOpen(false);
        dispatch(getShopOrderByIdThunk(orderId));
      } else {
        toast.error("Failed to delete review: " + resultAction.error.message);
      }
    } catch (err) {
      toast.error("Error deleting review");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} className="w-fit">
      <DialogTrigger asChild>
        {trigger || (
          <Edit className="cursor-pointer hover:text-primary" size={20} />
        )}
      </DialogTrigger>
      <DialogContent className="w-sm md:w-md lg:w-lg max-h-screen h-fit overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold text-start text-lg sm:text-xl">
            Edit Review
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

            {/* Action Buttons */}
            <div className="flex gap-3 mt-3">
              {/* Update Button */}
              <Button
                disabled={isLoading}
                type="submit"
                className="flex-1 text-white text-md bg-primary hover:bg-primary/90"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <p>Update Review</p>
                )}
              </Button>

              {/* Delete Button */}
              <Button
                disabled={isDeleting}
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="flex-1 text-white text-md bg-red-600 hover:bg-red-700"
              >
                {isDeleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Trash2 size={16} />
                    <p>Delete</p>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditReviewDialog;
