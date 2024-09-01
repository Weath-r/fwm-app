import WarningsPanel from "./WarningsPanel";
import { Popover } from "@headlessui/react";
import { useWarningsProvider } from "@/providers/StationsProvider";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function MobileWarnings() {
    const { warnings } = useWarningsProvider();

    return (
        warnings.length > 0 &&
        <Popover className="relative flex flex-col">
            <Popover.Button className="my-1 ml-auto mr-1 flex items-center rounded-lg bg-white p-2 text-sm text-danger shadow-sm outline-none">
                <ExclamationTriangleIcon className="size-6"></ExclamationTriangleIcon>
            </Popover.Button>
            <Popover.Panel className="h-screen w-full">
                <WarningsPanel></WarningsPanel>
            </Popover.Panel>
        </Popover>
    );
}