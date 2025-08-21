import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils";
import { Link } from "react-router";
import { Button } from "../shadcn/button";
import { Star } from "lucide-react";
import EditShopDialog from "./EditShopDialog";

const ShopInfo = ({ shop }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-4 lg:w-[350px] w-full p-5 shadow-2xl rounded-md h-full">
      <div className="flex flex-col gap-2 justify-center items-center mb-5">
        <img
          src={shop?.imageUrl}
          alt={shop?.shopName}
          className="w-40 h-40 object-cover rounded-full border-2 border-dark"
        />
        <p className="text-xl font-bold">{shop?.shopName}</p>
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="font-bold">Address</p>
          <p>{shop?.address}</p>
        </div>
        <div>
          <p className="font-bold">Phone Number</p>
          <p>{shop?.phoneNumber}</p>
        </div>
        <div>
          <p className="font-bold">Total Products</p>
          <p>{shop?.products?.length}</p>
        </div>
        <div>
          <p className="font-bold">Shop Rating</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="flex items-center gap-1">
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
            </div>
            <p className="text-sm text-gray-500 ml-2">{shop?.rating} / 5</p>
          </div>
        </div>
        <div>
          <p className="font-bold">Joined At</p>
          <p>{formatDate(shop?.createdAt)}</p>
        </div>
      </div>
      {user?._id === shop?.ownerId && (
        <div className="flex justify-center items-center mt-5">
          <EditShopDialog />
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
