import React from 'react';

interface TimeProps {
    title? : string;
    placeholder?: string;
    required?: boolean;
    value? : string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const TimeDropdown = (props:TimeProps) => {
  const times = [
    '12:00 am', '1:00 am', '2:00 am', '3:00 am', '4:00 am', '5:00 am',
    '6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am',
    '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm',
    '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm', '10:00 pm', '11:00 pm',
  ];

  return (
    <div className="w-full h-[100px] cursor-pointer flex flex-col items-start gap-[5px] self-stretch px-4 py-2 mb-4">
      <label htmlFor={props.name} className={`self-stretch font-normal font-Inter mb-2.5 leading-none tracking-tight`}>{props.title}</label>
      <select
        name={props.name}
        onChange={props.onChange}
        value={props.value}
        required={props.required}
        className='p-2 border cursor-pointer h-[100px] overflow-y-scroll border-solid rounded w-full h-[80%]'
        style={{ borderBottomColor: '#3490dc' }}
      >
        <option value="" disabled>{props.placeholder}</option>
        {times.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeDropdown;
