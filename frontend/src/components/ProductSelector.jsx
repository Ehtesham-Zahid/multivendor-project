import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";

const ProductSelector = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Product" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none">
        <SelectGroup className="outline-none">
          {/* <SelectLabel>CATEGORY</SelectLabel> */}
          <SelectItem value="apple" className="hover:bg-sky-200">
            Apple
          </SelectItem>
          <SelectItem className="hover:bg-sky-200" value="banana">
            Banana
          </SelectItem>
          <SelectItem className="hover:bg-sky-200" value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem className="hover:bg-sky-200" value="grapes">
            Grapes
          </SelectItem>
          <SelectItem className="hover:bg-sky-200" value="pineapple">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default ProductSelector;
