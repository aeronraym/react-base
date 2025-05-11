/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from "classnames";
import { useEffect, useRef, useState, ChangeEvent, KeyboardEvent } from "react";

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  id: string;
  options: SelectOption[] | undefined;
  isLoading: boolean;
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
}

export interface SelectOption {
  id: string;
  value: string;
}

const SelectInput = ({
  label,
  id,
  options,
  isLoading,
  value,
  onChange,
  placeholder,
  required,
  ...props
}: Props) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options?.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  // Set highlighted to 0 when options change
  useEffect(() => {
    setHighlighted(0);
  }, [search, open]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      setHighlighted((prev) => Math.min(prev + 1, filteredOptions.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlighted((prev) => Math.max(prev - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (filteredOptions[highlighted]) {
        handleSelect(filteredOptions[highlighted].id);
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      e.preventDefault();
    }
  };

  // Select option
  const handleSelect = (selectedId: string) => {
    setOpen(false);
    setSearch("");
    onChange?.({ target: { value: selectedId } });
  };

  // Show selected value or placeholder in the closed state
  const selectedOption = options?.find((opt) => opt.id === value);

  return (
    <div className="sm:col-span-4 relative" ref={containerRef}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={classNames(
          "relative w-full",
          "rounded-md bg-white/5 text-white shadow-sm ring-1 ring-inset ring-white/10",
          open && "ring-2 ring-white"
        )}
        tabIndex={0}
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
        onKeyDown={handleKeyDown}
      >
        <div
          className={classNames(
            "flex items-center px-2 py-2.5 cursor-pointer min-h-[40px]",
            !selectedOption && "text-gray-400"
          )}
        >
          {selectedOption ? selectedOption.value : (placeholder || "Select...")}
          <span className="ml-auto text-xs">&#9662;</span>
        </div>
        {open && (
          <div className="absolute left-0 right-0 z-10 bg-[#23272f] border border-white/20 rounded-b-md shadow-lg mt-1">
            <input
              ref={inputRef}
              type="text"
              className="w-full px-2 py-2 text-black rounded-t-md focus:outline-none"
              value={search}
              placeholder={placeholder || "Search..."}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{ borderBottom: "1px solid #eee" }}
              disabled={isLoading}
            />
            <ul className="max-h-48 overflow-y-auto">
              {isLoading && (
                <li className="px-2 py-2 text-gray-400">Loading...</li>
              )}
              {!isLoading && filteredOptions.length === 0 && (
                <li className="px-2 py-2 text-gray-400">No options</li>
              )}
              {!isLoading &&
                filteredOptions.map((option, idx) => (
                  <li
                    key={option.id}
                    className={classNames(
                      "px-2 py-2 cursor-pointer",
                      idx === highlighted
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-900"
                    )}
                    onMouseDown={() => handleSelect(option.id)}
                    onMouseEnter={() => setHighlighted(idx)}
                  >
                    {option.value}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
