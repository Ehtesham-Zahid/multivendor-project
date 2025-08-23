"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/dialog";
import { Button } from "../shadcn/button";
import { Loader2, Plus, X } from "lucide-react";
import CategorySelector from "./CategorySelector";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createProductThunk } from "../features/product/productSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const CreateProductDialog = () => {
  const { isCreateProductLoading, error } = useSelector(
    (state) => state.product
  );
  const { currentUserShop } = useSelector((state) => state.shop);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setImages(fileArray);

    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const onSubmit = async (data) => {
    if (currentUserShop.isActive === false) {
      toast.error("Please activate your shop to create products.");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    if (!categoryValue) {
      toast.error("Please select a category.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", categoryValue);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    if (data.discountPrice) {
      formData.append("discountPrice", data.discountPrice);
    }

    images.forEach((img) => {
      formData.append("images", img); // FIX: append each image individually
    });

    try {
      const resultAction = await dispatch(createProductThunk(formData));

      if (createProductThunk.fulfilled.match(resultAction)) {
        toast.success("Product Created!");
        reset(); // reset form
        setImages([]);
        setPreviews([]);
        setOpen(false);
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Error creating product.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="bg-primary text-white  text-md" size="lg">
          Create Product <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-sm md:w-md lg:w-lg max-h-screen   h-fit overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="mb- font-bold text-start text-lg sm:text-xl">
            Create Product
          </DialogTitle>
        </DialogHeader>

        <form
          className="flex flex-col gap-3 sm:gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-bold text-zinc-600 mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base"
              placeholder="Enter product name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm font-semibold">
                This field is required
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-bold text-zinc-600 mb-1">
              Description
            </label>
            <textarea
              className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base"
              placeholder="Enter product description"
              {...register("description", { required: true })}
            />{" "}
            {errors.description && (
              <span className="text-red-500 text-sm font-semibold">
                This field is required
              </span>
            )}
          </div>

          {/* Category Selector */}
          <CategorySelector setCategoryValue={setCategoryValue} />

          {/* Original Price */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-bold text-zinc-600 mb-1">
              Original Price
            </label>
            <input
              type="number"
              className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base"
              placeholder="Enter original price"
              {...register("price", { required: true })}
            />
            {errors.price && (
              <span className="text-red-500 text-sm font-semibold">
                This field is required
              </span>
            )}
          </div>

          {/* Discounted Price */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-bold text-zinc-600 mb-1">
              Discounted Price
            </label>
            <input
              type="number"
              defaultValue=""
              className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base"
              placeholder="Enter discounted price"
              {...register("discountPrice", {
                valueAsNumber: true,
                validate: (value) => {
                  if (isNaN(value)) return true;
                  return value >= 0 || "Discount cannot be negative";
                },
              })}
            />
            {errors.discountPrice && (
              <span className="text-red-500 text-sm font-semibold">
                {errors.discountPrice.message}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-bold text-zinc-600 mb-1">
              Product Stock
            </label>
            <input
              type="number"
              className="p-2 px-3 rounded-md border-2 border-zinc-300 outline-primary w-full text-sm sm:text-base"
              placeholder="Enter product stock"
              {...register("stock", { required: true })}
            />{" "}
            {errors.stock && (
              <span className="text-red-500 text-sm font-semibold">
                This field is required
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm text-start font-bold text-zinc-600 mb-1">
              Product Images
            </label>
            <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
              {previews.map((preview, index) => (
                <div key={index} className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <label
              htmlFor="file-input"
              className="mt-3 inline-flex items-center gap-1 p-2 px-3 border-2 border-zinc-300 rounded-md cursor-pointer w-fit text-sm"
            >
              Upload Images <Plus size={16} />
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {error ? (
            <p className="text-center text-danger font-bold text-sm mt-2">
              {error}
            </p>
          ) : null}

          {/* Submit Button */}
          <Button
            disabled={isCreateProductLoading}
            type="submit"
            className={"text-white text-md cursor-pointer w-full mt-3"}
          >
            {isCreateProductLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <p>Create Product</p>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
