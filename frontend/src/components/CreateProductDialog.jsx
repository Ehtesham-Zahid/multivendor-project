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
import { set } from "mongoose";

const CreateProductDialog = () => {
  const { isLoading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
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
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", categoryValue);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice);

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
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Error creating product.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="bg-primary text-white text-md" size="lg">
          Create Product <Plus className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle className="mb-5 font-bold">Create Product</DialogTitle>
          <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Product Name */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Product Name
              </label>
              <input
                type="text"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Description
              </label>
              <textarea
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter product description"
                {...register("description", { required: true })}
              />
            </div>

            {/* Category Selector */}
            <CategorySelector setCategoryValue={setCategoryValue} />

            {/* Original Price */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Original Price
              </label>
              <input
                type="number"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter original price"
                {...register("price", { required: true })}
              />
            </div>

            {/* Discounted Price */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Discounted Price
              </label>
              <input
                type="number"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter discounted price"
                {...register("discountPrice", { required: true })}
              />
            </div>

            {/* Stock */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600">
                Product Stock
              </label>
              <input
                type="number"
                className="p-1.5 px-2 rounded-md border-2 border-zinc-300 outline-primary w-md"
                placeholder="Enter product stock"
                {...register("stock", { required: true })}
              />
            </div>

            {/* Image Upload */}
            <div className="flex flex-col">
              <label className="text-sm font-bold text-zinc-600 mb-1">
                Product Images
              </label>
              <div className="flex items-center gap-5 flex-wrap">
                {previews.map((preview, index) => (
                  <div key={index} className="relative w-20 h-20">
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
                className="mt-3 inline-flex items-center gap-1 p-1.5 px-3 border-2 border-zinc-300 rounded-md cursor-pointer w-fit text-sm"
              >
                Upload Images <Plus size={16} />
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  // {...register("images", { required: true })}
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
              disabled={isLoading}
              type="submit"
              className={"text-white text-md cursor-pointer w-full mt-3"}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <p>Submit</p>
              )}
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
