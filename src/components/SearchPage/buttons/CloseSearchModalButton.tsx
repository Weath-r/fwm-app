import { XCircleIcon } from "@heroicons/react/24/solid";

type CloseSearchModalButtonProps = {
    onClose: () => void;
};

export const CloseSearchModalButton = ({ onClose }: CloseSearchModalButtonProps) => {
    return (
        <button
            className="appearance-none text-sm text-danger focus:outline-none"
            title="Close"
            aria-label="Close"
            onClick={onClose}
        >
            <XCircleIcon className="size-6" />
        </button>
    );
};
