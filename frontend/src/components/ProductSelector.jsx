import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductSelector = ({ setProductId, setProductPrice }) => {
  const [products, setProducts] = useState([]);
  const { shopProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const newProducts = shopProducts.filter(
      (product) => product.eventId === null
    );
    setProducts(newProducts);
  }, [shopProducts]);

  const handleChange = (selectedId) => {
    setProductId(selectedId);
    const selectedProduct = shopProducts.find(
      (product) => product._id === selectedId
    );
    setProductPrice(selectedProduct?.price || 0);
  };
  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Product" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none">
        <SelectGroup className="outline-none">
          {products?.map((product) => (
            <SelectItem
              key={product._id}
              value={product._id}
              className="hover:bg-sky-200"
            >
              {product.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ProductSelector;
