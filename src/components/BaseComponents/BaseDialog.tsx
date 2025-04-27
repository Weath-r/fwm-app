"use client";

import { ReactNode, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useDialog } from "@/hooks/useDialog"; 

type BaseModalProps = {
    children?: ReactNode;
    dialogTitle?: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;
    trigger?: ReactNode;
    triggerClass?: string;
};

export default function BaseDialog({
    children,
    dialogTitle = "",
    onOpen,
    onClose,
    isOpen,
    setIsOpen,
    trigger,
    triggerClass = "",
}: Readonly<BaseModalProps>) {
    const { open, openDialog, closeDialog } = useDialog({
        isOpen,
        setIsOpen,
        onOpen,
        onClose,
    });

    const portalContainer = useMemo(() => {
        if (typeof window !== "undefined") {
            return document.getElementById("portal") || undefined;
        }
        return undefined;
    }, []);


    return (
        <Dialog.Root 
            open={open} 
            onOpenChange={(o) => (o ? openDialog() : closeDialog())}
        >
            {trigger && (
                <Dialog.Trigger className={triggerClass}>
                    {trigger}
                </Dialog.Trigger>
            )}

            <Dialog.Portal 
                container={portalContainer}
            >
                <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
                <Dialog.Content
                    className="fixed left-1/2 top-1/2 z-10 max-h-[90vh] w-[98vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 overflow-y-hidden rounded-2xl bg-white p-4 focus:outline-none md:max-h-[98vh]"
                    onInteractOutside={(e) => e.preventDefault()}
                >
                    <Dialog.Title className="mb-2 flex items-center justify-between">
                        {dialogTitle}
                        <Dialog.Close asChild>
                            <button
                                className="appearance-none text-sm text-danger focus:outline-none"
                                title="Close"
                                aria-label="Close"
                                onClick={closeDialog}
                            >
                                <XCircleIcon className="size-6" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Title>
                    {children}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
