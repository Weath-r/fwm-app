import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

type BackToHomepageButtonProps = {
    language: string;
};

export const BackToHomepageButton = ({ language } : BackToHomepageButtonProps) => {
    return (
        <Link
            className="mt-1 block text-primary focus:outline-none"
            title="Go to homepage"
            aria-label="Go to homepage"
            href={`/${language}`}
        >
            <ArrowLeftCircleIcon className="size-6" />
        </Link>
    );
};