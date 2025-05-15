import { useState, useEffect, useRef } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type OptionsProp = {
  label: string;
};

type DropdownMenuComponentProps = {
  options: OptionsProp[];
  handleChangeVal: (val: any) => void;
};

export default function DropdownMenu({ options, handleChangeVal }: Readonly<DropdownMenuComponentProps>) {
    const [selected, setSelected] = useState<OptionsProp>({ label: "" });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (options.length > 0) {
            setSelected(options[0]);
        }
    }, [options]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleOnChange = (value: OptionsProp) => {
        setSelected(value);
        handleChangeVal(value.label);
        setIsOpen(false);
    };

    return (
        <div className="relative z-10 w-72" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm"
            >
                <span className="block truncate font-bold capitalize text-primary">{selected.label}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon className="size-5 text-primary" aria-hidden="true" />
                </span>
            </button>

            <ul
                className={`absolute z-20 mt-1 w-full overflow-hidden rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 transition-all duration-300 ease-in-out focus:outline-none sm:text-sm ${
                    isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {options.map((option, idx) => (
                    <li
                        key={idx}
                        onClick={() => handleOnChange(option)}
                        className={"relative cursor-pointer select-none py-2 pl-10 pr-4 text-primary hover:font-bold"}
                    >
                        <span
                            className={`block truncate capitalize ${
                                selected.label === option.label ? "font-bold" : "font-normal"
                            }`}
                        >
                            {option.label}
                        </span>
                        {selected.label === option.label && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-success">
                                <CheckIcon className="size-5" aria-hidden="true" />
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
