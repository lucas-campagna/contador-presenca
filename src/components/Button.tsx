export type ButtonProps = {
  label: string;
  onClick?: (_: any) => void;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ label, ...props }: ButtonProps) => (
  <button
    {...props}
    className="inline-flex items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-white uppercase tracking-widest hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:border-sky-700 focus:ring-sky-700 disabled:opacity-25 transition"
  >
    {label}
  </button>
);

export default Button;
