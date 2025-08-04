import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";
import { useSelector } from "react-redux";

const ProductSelector = ({ setProductId, setProductPrice }) => {
  const { shopProducts } = useSelector((state) => state.product);

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
          {shopProducts?.map((product) => (
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
