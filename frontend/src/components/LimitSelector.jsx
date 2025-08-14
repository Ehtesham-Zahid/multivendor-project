import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/select";

const LimitSelector = ({ setLimit, defaultValue = "10", setPage }) => {
  const limitOptions = ["10", "25", "50", "100"];

  const handleChange = (value) => {
    setLimit(value);
    setPage(1);
  };

  return (
    <Select onValueChange={handleChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full bg-background border-2 border-dark cursor-pointer">
        <SelectValue placeholder="Select Limit" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none">
        <SelectGroup className="outline-none">
          {limitOptions.map((limit) => (
            <SelectItem key={limit} value={limit} className="hover:bg-sky-200">
              {limit}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LimitSelector;
