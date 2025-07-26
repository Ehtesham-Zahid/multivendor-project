import { ArrowDown } from "lucide-react";

const Dropdown = () => {
  return (
    <div>
      <label className="text-dark flex justify-between">
        <p className="bg-background">
          <ListFilter color="1f2937" />
          All Categories
        </p>
        <ArrowDown color="1f2937" />
      </label>
    </div>
  );
};

export default Dropdown;
