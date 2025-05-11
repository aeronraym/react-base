interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
    placeholder?: string;
    rows: number;
}
const TextArea = ({ label, id, placeholder, rows = 4, ...props}:Props) => {
    const { required } = props;
    return (
        <div className="sm:col-span-4">
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-white">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset">
          <textarea
            rows={rows}
            id={id}
            placeholder={placeholder}
            className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
            {...props}
          >

          </textarea>
        </div>
      </div>
    </div>
        
    );
}
 
export default TextArea;