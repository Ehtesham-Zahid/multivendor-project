import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";
import { State } from "country-state-city";
import { useEffect, useState } from "react";

const StateSelector = ({ countryName, setState, countryCode }) => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    if (!countryCode) return;

    // Get the country's ISO code first
    const allCountries = State.getAllStates();
    console.log(allCountries);
    const selectedStates = allCountries.filter(
      (state) => state.countryCode === countryCode
    );
    console.log(selectedStates);

    setStates(selectedStates);
  }, [countryCode]);

  const handleChange = (stateName) => {
    setState(stateName);
  };

  return (
    <Select onValueChange={handleChange} disabled={!countryName}>
      <SelectTrigger className="px-2 py-5 rounded-md border-2 border-zinc-400 outline-primary w-full">
        <SelectValue placeholder="Select a State" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none max-h-60 overflow-y-auto">
        <SelectGroup>
          {states.map((state) => (
            <SelectItem
              key={state.name}
              value={state.name}
              className="hover:bg-sky-200"
            >
              {state.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StateSelector;
