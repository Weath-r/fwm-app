"use client";
import { ReactNode, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { useDialogStore } from "@/stores/dialogStore";

type BaseModalProps = {
    children?: ReactNode;
    dialogTitle?: ReactNode;
    onClose?: () => void;
    trigger?: ReactNode;
    triggerClass?: string;
};

export default function BaseDialog({
    children,
    dialogTitle = "",
    onClose,
    trigger,
    triggerClass = "",
}: Readonly<BaseModalProps>) {
    const { dialog } = useDialogStore();
    const portalContainer = useMemo(() => {
        if (typeof window !== "undefined") {
            return document.getElementById("portal") || undefined;
        }
        return undefined;
    }, []);

    return (
        <Dialog.Root 
            open={dialog}
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
                    aria-description="Modal content"
                >
                    <Dialog.DialogDescription></Dialog.DialogDescription>
                    <Dialog.Title className="mb-2 flex items-center justify-between">
                        {dialogTitle}
                        <Dialog.Close asChild>
                            <button
                                className="appearance-none text-sm text-danger focus:outline-none"
                                title="Close"
                                aria-label="Close"
                                onClick={onClose}
                            >
                                <XCircleIcon className="size-6" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Title>
                    <>
                        { children }
                    </>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
