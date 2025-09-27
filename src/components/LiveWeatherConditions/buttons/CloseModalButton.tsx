import { useRouter } from "next/navigation";
import { XCircleIcon } from "@heroicons/react/24/solid";

export const CloseModalButton = () => {
    const router = useRouter();
    return (
        <button
            className="appearance-none text-sm text-danger focus:outline-none"
            title="Close"
            aria-label="Close"
            onClick={() => router.back()}
        >
            <XCircleIcon className="size-6" />
        </button>
    );
};