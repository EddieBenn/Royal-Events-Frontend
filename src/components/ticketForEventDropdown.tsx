import React from 'react';
import { formatCurrency } from '../utility/currencyFormat';

export type Ticket = {
ticket_amount: string;
ticket_availability: string;
ticket_description: string;
ticket_quantity: string;
ticket_type: string;
}
interface TicketsDropdownProps {
  tickets: Ticket[];
  onTicketSelect: (ticket: Ticket) => void;
}

const EventsTicketsDropdown: React.FC<TicketsDropdownProps> = ({ tickets, onTicketSelect }) => {
  return (
    <div className="self-stretch mt-2">
      <label className="text-black font-normal font-Inter mb-2.5 leading-none tracking-tight">
        Select Ticket Type
      </label>
      <select
        className="w-full h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500"
        onChange={(e) => {
          const selectedTicket = tickets.find((ticket) => ticket.ticket_type === e.target.value);
          if (selectedTicket) {
            onTicketSelect(selectedTicket);
          }
        }}
      >
        <option value="">Select a ticket</option>
        {tickets ? (tickets?.map((ticket, index) => (
          <option key={index} value={ticket.ticket_type}>
            {ticket.ticket_type} - {formatCurrency(Number(ticket.ticket_amount))}
          </option>
        ))):null}
      </select>
    </div>
  );
};

export default EventsTicketsDropdown;
