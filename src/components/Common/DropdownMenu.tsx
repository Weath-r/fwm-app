import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

type OptionsProp = {
    label: string;
};
type DropdownMenuComponentProps = {
    options: OptionsProp[];
    handleChangeVal: (val:any) => void;
};

export default function DropdownMenu({ options, handleChangeVal }: Readonly<DropdownMenuComponentProps>) {
    const [selected, setSelected] = useState({
        label: "",
    });

    useEffect(() => {
        if (options.length > 0 ) {
            setSelected(options[0]);
        }
    }, [options]);

    const handleOnChange = (value:OptionsProp) => {
        setSelected(value);
        handleChangeVal(value.label);
    };
    return (
        <div className="z-10 w-72">
            <Listbox 
                value={selected} 
                onChange={handleOnChange}
            >
                <div className="relative mt-1">
                    <Listbox.Button 
                        className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                    >
                        <span className="block truncate font-bold capitalize text-primary">
                            {selected.label}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="size-5 text-primary"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {options.map((option, optionIdx) => (
                                <Listbox.Option
                                    key={optionIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4  text-primary ${
                                            active ? "font-bold" : ""
                                        }`
                                    }
                                    value={option}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate capitalize ${
                                                    selected ? "font-bold" : "font-normal"
                                                }`}
                                            >
                                                {option.label}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-success">
                                                    <CheckIcon className="size-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
