import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { CircleUserRound, Plus } from "lucide-react";
import CategorySelector from "./CategorySelector";

const CreateProductDialog = () => {
  return (
    <Dialog className="w-fit">
      <DialogTrigger>
        <Button className="bg-primary text-white text-md" size="lg">
          Create Product <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">Create Product</DialogTitle>
          <form className="flex flex-col gap-5">
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Product Name
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter product name"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Description
              </label>
              <textarea
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter product Description"
              />
            </div>
            <CategorySelector />
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Original Price
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter original price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Discounted Price
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter discounted price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Product Stock
              </label>
              <input
                type="text"
                className="p-1.5 px-2   rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter product stock"
              />
            </div>
            <div className="flex flex-col  ">
              <label className="text-sm font-bold text-zinc-600 mb-1">
                Product Images
              </label>
              <div className="flex items-center gap-5">
                {/* <img
                    src={preview}
                    alt="Preview"
                    className="w-10 h-10 rounded-full object-cover"
                  /> */}
                {/* <CircleUserRound size={"28px"} /> */}
                <label
                  for="file-input"
                  className="p-1.5 px-2   rounded-md border-2 border-zinc-300 w-fit cursor-pointer"
                >
                  <span className=" font-medium text-nowrap flex items-center gap-1.5">
                    Upload Images <Plus size={16} />
                  </span>
                  <input
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    class="sr-only"
                    type="file"
                  ></input>
                </label>
              </div>
            </div>
            <Button className={"text-white text-md mt-3"}>Create</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
