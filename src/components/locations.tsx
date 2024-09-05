import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Props {
  placeholder: string;
  text: string;
  h: string;
  onChange: (selectedLocation: any) => void;
}

const Locations = (props: Props) => {
  interface Location {
    name: string;
    code: string;
  }
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const locations: Location[] = [
    { name: "Aba", code: "AB" },
    { name: "Abeokuta", code: "ABK" },
    { name: "Abuja", code: "ABJ" },
    { name: "Awka", code: "AWK" },
    { name: "Benin", code: "BEN" },
    { name: "Enugu", code: "ENU" },
    { name: "Ibadan", code: "IB" },
    { name: "Lagos", code: "LAG" },
    { name: "Owerri", code: "OW" },
    { name: "Port Harcourt", code: "PH" },
  ];

  const handleLocationChange = (e: DropdownChangeEvent) => {
    setSelectedLocation(e.value);
    props.onChange(e.value); // Call the parent onChange function with the selected location
  };


  return (
    <div className="self-stretch rounded-[5px] justify-between items-center inline-flex">
      <Dropdown
        value={selectedLocation}
        onChange={handleLocationChange}
        options={locations}
        optionLabel="name"
        placeholder={props.placeholder}
        className={`${props.text} bg-gray-200 font-normal font-['Product Sans'] w-full md:w-14rem`}
      />
    </div>
  );
};

export default Locations;
