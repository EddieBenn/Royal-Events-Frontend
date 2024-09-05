import React from 'react';

interface Props {
  title: string;
  placeholder: string;
  type: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  text?: string;
  font?: string;
}

function Input(props: Props) {
  return (
    <div className="w-full h-[78px] items-start gap-[15px] self-stretch px-4 py-2 mb-4">
      <label className={`self-stretch font-${props.font} text-${props.text}-50 font-normal font-Inter mb-2.5 leading-none tracking-tight`}>
        {props.title}
      </label>
      <div className="">
        <input
          placeholder={props.placeholder}
          type={props.type}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          disabled={props.disabled}
          className="self-stretch h-[46px] focus:outline-none p-2.5 bg-gray-50 font-Inter rounded-[5px] border-b-2 border-green-500 items-center gap-2.5 w-full"
        />
      </div>
    </div>
  );
}

export default Input;
