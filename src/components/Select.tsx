import { useState } from "react";

type SelectPropsType = {
  options: string[];
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

function Select({ options, ...props }: SelectPropsType) {
  const [value, setValue] = useState("");
  return (
    <select
      {...props}
      className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
                 focus:outline-none focus:border-primary focus:ring-primary
                 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {options.map((opt) => (
        <option value={opt}>{opt}</option>
      ))}
    </select>
  );
}

export default Select;
