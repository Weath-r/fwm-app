import { useRouter } from "next/navigation";
import { XCircleIcon } from "@heroicons/react/24/solid";

type CloseModalButtonProps = {
    returnUrl?: string;
};

export const CloseModalButton = ({ returnUrl }: CloseModalButtonProps) => {
    const router = useRouter();
    return (
        <button
            className="appearance-none text-sm text-danger focus:outline-none"
            title="Close"
            aria-label="Close"
            onClick={() => (returnUrl ? router.push(returnUrl) : router.back())}
        >
            <XCircleIcon className="size-6" />
        </button>
    );
};
