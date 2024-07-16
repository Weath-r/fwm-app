import WarningsPanel from "./WarningsPanel";
import { Popover } from "@headlessui/react";
import { useWarningsProvider } from "@/providers/StationsProvider";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function MobileWarnings() {
    const { warnings } = useWarningsProvider();
    const perRegionWarnings = Object.values(warnings).reduce((acc, current):number => {
        const warningsLegth = current.warnings.length;
        acc += warningsLegth;
        return acc;
    },0);
    return (
        warnings.length > 0 &&
        <Popover className="relative flex flex-col">
            <Popover.Button className="my-1 ml-auto mr-1 flex items-center rounded-lg bg-white p-2 text-sm text-danger outline-none">
                <ExclamationTriangleIcon className="mr-1 size-6"></ExclamationTriangleIcon>
                <p>{perRegionWarnings} warnings</p>
            </Popover.Button>
            <Popover.Panel className="h-screen w-full">
                <WarningsPanel></WarningsPanel>
            </Popover.Panel>
        </Popover>
    );
}