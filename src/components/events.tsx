import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface Props {
  placeholder: string;
  text: string;
  h: string;
  onChange: (selectedEvent: any) => void;
}

const Events = (props: Props) => {
  interface Event {
    name: string;
    code: string;
  }
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const events: Event[] = [
    { name: "Business", code: "BSN" },
    { name: "Charity", code: "FR" },
    { name: "Community", code: "CM" },
    { name: "Conference", code: "CF" },
    { name: "Concert", code: "CT" },
    { name: "Corporate off-sites & executive meeting", code: "CEM" },
    { name: "Exhibition", code: "FR" },
    { name: "Fashion shows and red carpets", code: "FR" },
    { name: "Festival", code: "FR" },
    { name: "Fundraising", code: "FR" },
    { name: "Hybrid", code: "HY" },
    { name: "Networking", code: "FR" },
    { name: "Private Party", code: "PP" },
    { name: "Product launch", code: "PL" },
    { name: "Seminar", code: "SEM" },
    { name: "Sports and competition", code: "SP" },
    { name: "Team building", code: "TB" },
    { name: "Trade show", code: "FR" },
    { name: "Virtual", code: "VR" },
    { name: "Wedding", code: "FR" },
    { name: "Workshop", code: "WS" },
    { name: "Other", code: "OTHER"}
  ];

  const handleEventChange = (e: DropdownChangeEvent) => {
    setSelectedEvent(e.value);
    props.onChange(e.value); // Call the parent onChange function with the selected event
  };
  return (
    <div className="self-stretch bg-gray-200 rounded-[5px] justify-between items-center inline-flex">
      <Dropdown
        value={selectedEvent}
        onChange={handleEventChange}
        options={events}
        optionLabel="name"
        placeholder={props.placeholder}
        className={`${props.text} bg-gray-200 font-normal font-['Product Sans'] w-full md:w-14rem`}
      />
    </div>
  );
};

export default Events;
