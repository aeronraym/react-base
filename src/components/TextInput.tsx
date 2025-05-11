interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder?: string;
}

const TextInput = ({ label, id, placeholder, ...props }: Props) => {
  const { required } = props;
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-[var(--text-color)]"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-[var(--text-color)]/5 ring-1 ring-inset ring-[var(--text-color)]/10 focus-within:ring-2 focus-within:ring-inset">
          <input
            id={id}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
            {...props}
          />
        </div>
      </div>
    </div>
  );
};

export default TextInput;
