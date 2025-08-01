import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Eye, Heart } from "lucide-react";
import { Button } from "../shadcn/button";

import ProductImage from "../assets/images/category-1.jpg";
import Logo from "../assets/images/logo.png";
import { Badge } from "../shadcn/badge";
import QuantityCounter from "./QuantityCounter";

const ProductDialog = ({ title, description }) => {
  return (
    <div>
      <Dialog className="w-screen">
        <DialogTrigger>
          <Eye
            className="bg-white rounded-sm p-1 hover:bg-orange-300 "
            size={"28px"}
          />
        </DialogTrigger>
        <DialogContent className="rounded-lg w-screen h-1/2 grid grid-cols-2 gap-10">
          <div className="flex justify-between items-center flex-col gap-y-8">
            <img src={ProductImage} className="w- rounded-lg shadow-2xl" />
            <div className="flex gap-5 w-full items-center">
              <img
                src={Logo}
                className="rounded-full w-16 h-16 border-secondary border-2 object-contain"
              />
              <div className="flex flex-col">
                <p className="font-bold">Hyper Products</p>
                <p>5 Ratings</p>
              </div>
            </div>
            <Button
              className="text-white w-full bg-secondary text-md cursor-pointer hover:bg-orange-400"
              size={"lg"}
            >
              Contact Seller
            </Button>
            {/* <p className="text-center font-bold text-primary">99 in Stock</p> */}
          </div>
          <div className="flex justify-between items-center flex-col gap-y-8">
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-blue-800">
                HyperX Cloud Stinger Core
              </p>
              <p className="">
                HyperX Cloud Stinger Core Wireless Gaming Headset for
                PlayStation OPEN BOX Lightweight Comfort Durable steels Sliders
                Swivel-to-mute noise cancelling mic Compatible with PS5™, PS4™
                & PC
              </p>
              <div className="flex justify-between mt-3">
                <p className="font-bold text-3xl">110$</p>
                <Badge variant="default" className="text-white bg-secondary">
                  120 Sold
                </Badge>
              </div>
              <div className="mt-3 flex items-center gap-x-5">
                <QuantityCounter />
                <Heart size={"28px"} className="cursor-pointer" />
              </div>
            </div>
            <Button
              className="text-white w-full  text-md cursor-pointer"
              size={"lg"}
            >
              Add To Cart
            </Button>
          </div>
          {/* <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductDialog;
