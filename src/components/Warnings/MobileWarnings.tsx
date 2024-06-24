import WarningsPanel from "./WarningsPanel";
import { Popover } from "@headlessui/react";
import { useStationsProvider } from "@/providers/StationsProvider";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

export default function MobileWarnings() {
    const { warnings } = useStationsProvider();
    const perRegionWarnings = Object.values(warnings).reduce((acc, current):number => {
        const warningsLegth = current.warnings.length;
        acc += warningsLegth;
        return acc;
    },0);
    return (
        warnings.length > 0 &&
        <Popover className="relative flex flex-col">
            <Popover.Button className="ml-auto my-1 mr-1 bg-white rounded-lg outline-none p-2 text-danger text-sm flex items-center">
                <ExclamationTriangleIcon className="h-6 w-6 mr-1"></ExclamationTriangleIcon>
                <p>{perRegionWarnings} warnings</p>
            </Popover.Button>
            <Popover.Panel className="w-full h-screen">
                <WarningsPanel></WarningsPanel>
            </Popover.Panel>
        </Popover>
    );
}