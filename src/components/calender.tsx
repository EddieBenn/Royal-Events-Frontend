import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

interface CalendarInputProps {
  onChange: (date: any) => void;
}

export const CalendarInput: React.FC<CalendarInputProps> = ({ onChange }) => {
  const [date, setDate] = useState<Nullable<Date>>(null);

  const handleDateChange = (e: any) => {
    const selectedDate: Date | null = e.value;
    setDate(selectedDate);
    onChange(selectedDate);
  };

  return (
    <div className="justify-between items-center inline-flex">
      <Calendar
        value={date}
        onChange={handleDateChange}
        showIcon
        className="self-stretch pl-3 h-[42px] rounded-[5px] border-b-2 text-green-500 text-s bg-gray-200 font-normal font-['Product Sans'] w-full md:w-14rem"
      />
    </div>
  );
};

export default CalendarInput;
