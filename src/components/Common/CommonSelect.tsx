import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

type SelectPropsWithPlaceholder = React.PropsWithChildren<SelectPrimitive.SelectProps> & {
	placeholder?: React.ReactNode;
};

export const Select = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	SelectPropsWithPlaceholder
>(
    ({ children, placeholder, ...props }, forwardedRef) => {
        const portalContainer = useMemo(() => {
            if (typeof window !== "undefined") {
                return document.getElementById("portal") || undefined;
            }
            return undefined;
        }, []);
        return (
            <SelectPrimitive.Root {...props}>
                <SelectPrimitive.Trigger 
                    ref={forwardedRef} 
                    className="flex w-full items-center justify-between"
                >
                    <SelectPrimitive.Value placeholder={placeholder} />
                    <SelectPrimitive.Icon>
                        <ChevronDownIcon className="size-4" />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>
                <SelectPrimitive.Portal container={portalContainer}>
                    <SelectPrimitive.Content 
                        className="w-full rounded-md bg-white text-primary"
                        position="popper" 
                        sideOffset={5}
                    >
                        <SelectPrimitive.ScrollUpButton>
                            <ChevronUpIcon className="size-4" />
                        </SelectPrimitive.ScrollUpButton>
                        <SelectPrimitive.Viewport className="max-h-60">
                            {children}
                        </SelectPrimitive.Viewport>
                        <SelectPrimitive.ScrollDownButton>
                            <ChevronDownIcon className="size-4" />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
        );
    }
);

export const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.PropsWithChildren<SelectPrimitive.SelectItemProps>
>(
    ({ children, ...props }, forwardedRef) => {
        return (
            <SelectPrimitive.Item {...props} ref={forwardedRef}>
                <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
            </SelectPrimitive.Item>
        );
    }
);

Select.displayName = "Select";
SelectItem.displayName = "SelectItem";
