import { ReactNode, useState } from "react";

type BaseToggleProps = {
    initialChecked?: boolean;
    size?: "small" | "large";
    children: ReactNode;
    clickHandler: () => void;
};
  
export default function BaseToggle({ 
    initialChecked = false,
    children,
    size = "small",
    clickHandler,
}: Readonly<BaseToggleProps>) {
    const [isChecked, setIsChecked] = useState(initialChecked);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        clickHandler();
    };

    const sizeClasses = {
        small: {
            toggle: "w-9 h-5 text-xxs",
            dot: "w-4 h-4 top-0.5 left-0.5",
        },
        large: {
            toggle: "w-11 h-6 text-xs",
            dot: "w-5 h-5 top-0.5 left-0.5",
        },
    };

    const currentSize = sizeClasses[size];

    return (
        <div className="flex items-center justify-center">
            <label htmlFor="toggle" className="flex cursor-pointer items-center">
                <div className="relative">
                    <input
                        id="toggle"
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={handleToggle}
                    />
                    <div className={`block bg-gray/20 ${currentSize.toggle} rounded-full`}></div>
                    <div
                        className={`dot absolute ${currentSize.dot} rounded-full transition ${
                            isChecked ? "translate-x-full bg-success" : "bg-gray"
                        }`}
                    ></div>
                </div>
                <div className="ml-3 font-medium text-primary">
                    {children}
                </div>
            </label>
        </div>
    );
};