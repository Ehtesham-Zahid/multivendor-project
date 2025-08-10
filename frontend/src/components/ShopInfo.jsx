import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../utils";
import { Link } from "react-router";
import { Button } from "../shadcn/button";

const ShopInfo = ({ shop }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-4 lg:w-[300px] w-full p-5 shadow-2xl rounded-md h-full">
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
          <p>{shop?.rating}</p>
        </div>
        <div>
          <p className="font-bold">Joined At</p>
          <p>{formatDate(shop?.createdAt)}</p>
        </div>
      </div>
      {user?._id === shop?.ownerId && (
        <div className="flex justify-center items-center mt-5">
          <Link
            to={`/dashboard/shop/${shop?._id}/edit`}
            className="w-full text-center"
          >
            <Button className="bg-primary text-white px-4 py-2 rounded-md w-full text-center cursor-pointer">
              Edit
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
