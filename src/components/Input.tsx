import { useState } from "react";

export type InputType = {
    label: string,
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

function Input({label, ...props}: InputType) {
  const [value, setValue] = useState("");
  return (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        name={label}
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
          focus:outline-none focus:border-sky-500 focus:ring-sky-500
          disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
          focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        // TODO: Proriedade interessante. Estudar melhor uso
        // invalid:border-pink-500 invalid:text-pink-600
      />
    </label>
  );
}
export default Input;