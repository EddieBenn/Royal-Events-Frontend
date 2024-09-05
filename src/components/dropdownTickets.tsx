import { useState } from "react";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

export interface Tickets {
  name: string;
  price?: number;
  quantity?: number;
}
const TicketsDropdown = ({
  onTicketSelect,
}: {
  onTicketSelect: (ticket: Tickets) => void;
}) => {
  const [selectedTicket, setSelectedTicket] = useState<Tickets | null>(null);
  const tickets: Tickets[] = [
    { name: "Early Birds" },
    { name: "General or Regular" },
    { name: "Group Package" },
    { name: "Hidden or Invisible" },
    { name: "Members Only" },
    { name: "Reserved Seat" },
    { name: "Student"},
    { name: "VIP or Luxury" },
    { name: "Virtual Pass" },
    { name: "Other"}
  ];

  const handleTicketSelect = (e: DropdownChangeEvent) => {
    const selectedTicket = e.value as Tickets;
    setSelectedTicket(selectedTicket);
    onTicketSelect(selectedTicket);
  };

  return (
    <div className="w-full h-[78px] items-start gap-[15px] self-stretch px-4 py-2 mb-4">
      <label className="self-stretch text-black font-normal font-Inter mb-2.5 leading-none tracking-tight">
        Select Ticket Types
      </label>
      <Dropdown
        value={selectedTicket}
        required
        onChange={handleTicketSelect}
        options={tickets}
        optionLabel="name"
        placeholder="Choose Ticket"
        className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full"
      />
    </div>
  );
};

export default TicketsDropdown;