import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/select";
import { Country } from "country-state-city";
import { useEffect, useState } from "react";

const CountrySelector = ({ setCountry, setCountryCode }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries(); // returns [{ name, isoCode }]
    setCountries(allCountries);
  }, []);

  const handleChange = (countryCode) => {
    const selected = countries.find((c) => c.isoCode === countryCode);
    setCountry(selected?.name);
    setCountryCode(selected?.isoCode);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="px-2 py-5 rounded-md border-2 border-zinc-400 outline-primary w-full">
        <SelectValue placeholder="Select a Country" />
      </SelectTrigger>
      <SelectContent className="bg-background outline-none max-h-60 overflow-y-auto">
        <SelectGroup>
          {countries.map((country) => (
            <SelectItem
              key={country.isoCode}
              value={country.isoCode}
              className="hover:bg-sky-200"
            >
              {country.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CountrySelector;
