import React from "react";
import { Button } from "../../shadcn/button";
import AddressCard from "../AddressCard";
import CreateAddressDialog from "../CreateAddressDialog";

const AddressSection = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between">
        <p className="font-bold text-3xl">My Addresses</p>
        {/* <Button className="text-md text-white" size={"lg"}>
          Add New
        </Button> */}
        <CreateAddressDialog />
      </div>
      <div className="flex w-full justify-start items-center gap-8 flex-wrap">
        {/* <p className="text-center font-semibold">
          You dont have any Saved Address
        </p> */}
        <AddressCard />
        <AddressCard />
      </div>
    </div>
  );
};

export default AddressSection;
