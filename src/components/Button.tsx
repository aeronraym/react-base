import classMerge from "../utils/classmerge";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
// focus-visible:outline-2
const Button = ({ children, className, type, ...props }: Props) => {
  return (
    <button
      className={classMerge(
        "block rounded-md bg text-[var(--text-color)] bg-[var(--background-color)] border border-gray-500 hover:border-gray-200 transition-all px-3 py-2 text-center text-sm font-semibold  focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white",
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
