import React, { useEffect } from "react";
import { Button } from "../../shadcn/button";
import AddressCard from "../AddressCard";
import CreateAddressDialog from "../CreateAddressDialog";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Spinner";
import { getUserAddressThunk } from "../../features/address/addressSlice";

const UserAddressesSection = () => {
  const dispatch = useDispatch();
  const { addresses, isLoading, error } = useSelector((state) => state.address);
  // const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    // Fetch user addresses when the component mounts
    dispatch(getUserAddressThunk());
  }, []);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="font-bold text-2xl sm:text-3xl">My Addresses</p>
        <CreateAddressDialog />
      </div>
      <div className="flex w-full justify-center md:justify-start items-center gap-8 flex-wrap">
        {isLoading ? (
          <div className="flex justify-center items-center h-full w-full pt-20">
            <Spinner />
          </div>
        ) : addresses.length === 0 ? (
          <p className="text-center font-semibold mx-auto">
            You don't have any Saved Address
          </p>
        ) : (
          <>
            {addresses?.map((address, index) => (
              <AddressCard key={address._id} address={address} index={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default UserAddressesSection;
