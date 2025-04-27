import { useState, useEffect, useCallback } from "react";

type UseDialogProps = {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export function useDialog({
    isOpen,
    setIsOpen,
    onOpen,
    onClose,
}: UseDialogProps) {
    const [isInternalOpen, setIsInternalOpen] = useState(false);

    const isControlled = isOpen && typeof setIsOpen === "function";

    const open = isControlled ? isOpen! : isInternalOpen;

    const openDialog = useCallback(() => {
        if (isControlled) {
            setIsOpen?.(true);
        } else {
            setIsInternalOpen(true);
        }
        onOpen?.();
    }, [isControlled, setIsOpen, onOpen]);

    const closeDialog = useCallback(() => {
        if (isControlled) {
            setIsOpen?.(false);
        } else {
            setIsInternalOpen(false);
        }
        onClose?.();
    }, [isControlled, setIsOpen, onClose]);

    const toggleDialog = useCallback(() => {
        if (open) {
            closeDialog();
        } else {
            openDialog();
        }
    }, [open, openDialog, closeDialog]);

    useEffect(() => {
        return () => {
            setIsInternalOpen(false);
            setIsOpen?.(false);
        };
    }, []);

    return {
        open,
        openDialog,
        closeDialog,
        toggleDialog,
    };
}
