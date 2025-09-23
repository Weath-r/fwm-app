import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useMemo } from "react";

type DialogContentProps = React.PropsWithChildren<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
> & {
    dialogTitle?: React.ReactNode;
    closeModalButton?: React.ReactNode;
};

export const DialogContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    DialogContentProps
>(
    ({ children, dialogTitle, closeModalButton, ...props }, forwardedRef) => {
        const defaultCloseButton = (
            <button
                className="appearance-none text-sm text-danger focus:outline-none"
                title="Close"
                aria-label="Close"
            >
                <XCircleIcon className="size-6" />
            </button>
        );

        const portalContainer = useMemo(() => {
            if (typeof window !== "undefined") {
                return document.getElementById("portal") || undefined;
            }
            return undefined;
        }, []);

        return (
            <DialogPrimitive.Portal container={portalContainer}>
                <DialogPrimitive.Overlay className="fixed inset-0 z-10 bg-black/50" />
                <DialogPrimitive.DialogDescription />
                <DialogPrimitive.Content 
                    {...props} 
                    ref={forwardedRef}
                    className="fixed left-1/2 top-1/2 z-10 max-h-[90vh] w-[98vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-y-hidden rounded-2xl bg-white p-4 focus:outline-none md:max-h-[98vh]"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    {dialogTitle && <DialogPrimitive.Title className="mb-2 flex items-center justify-between">
                        {dialogTitle}
                        <DialogPrimitive.Close asChild>
                            {closeModalButton ? closeModalButton : defaultCloseButton}
                        </DialogPrimitive.Close>
                    </DialogPrimitive.Title>}
                    {!dialogTitle && <DialogPrimitive.Title className="mb-2 flex items-center justify-between"></DialogPrimitive.Title>}
                    {children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        );
    }
);
DialogContent.displayName = "DialogContent";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
