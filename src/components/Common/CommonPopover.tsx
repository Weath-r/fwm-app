import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { useMemo } from "react";

type PopoverContentProps = React.PropsWithChildren<
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
> & {};

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;

export const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    PopoverContentProps
>(({ children, ...props }, forwardedRef) => {
    const portalContainer = useMemo(() => {
        if (typeof window !== "undefined") {
            return document.getElementById("portal") || undefined;
        }
        return undefined;
    }, []);

    return (
        <PopoverPrimitive.Portal container={portalContainer}>
            <PopoverPrimitive.Content {...props} ref={forwardedRef}>
                {children}
            </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
    );
});

PopoverContent.displayName = "PopoverContent";
