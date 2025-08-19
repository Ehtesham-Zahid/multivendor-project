import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";

const MessageCard = ({ message, isShop }) => {
  const { user } = useSelector((state) => state.auth);
  const userId = isShop === "true" ? user.shopId : user._id;

  return (
    <div className="flex flex-col gap-0">
      <div
        className={`${
          message?.sender?._id === userId
            ? "bg-primary text-white self-end"
            : "bg-gray-200 text-black self-start"
        } px-3 py-1 rounded-lg w-fit max-w-[230px] text-sm`}
      >
        {message.message}
      </div>
      <div
        className={`${
          message?.sender?._id === userId ? "self-end" : "self-start"
        } text-xs text-gray-500`}
      >
        {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
      </div>
    </div>
  );
};

export default MessageCard;
