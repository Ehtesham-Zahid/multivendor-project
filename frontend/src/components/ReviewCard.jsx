import React from "react";
import { formatDate } from "../utils";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 pb-4 w-full border shadow-lg p-4 rounded-lg">
      <div>
        <img
          src={review.userId.imageUrl}
          alt={review.userId.fullname}
          className="sm:w-16 sm:h-16 w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="text-sm sm:text-md font-bold">
            {review.userId.fullname}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(review.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                index < review.rating ? "text-yellow-500" : "text-gray-300"
              }`}
              fill={index < review.rating ? "currentColor" : "none"}
            />
          ))}
          <p className="text-sm text-gray-500 ml-2">{review.rating} / 5</p>
        </div>
        <p className="text-sm sm:text-md text-dark">{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
