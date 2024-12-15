import WarningsPanel from "./WarningsPanel";
import { useWarningsProvider } from "@/providers/StationsProvider";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import DropdownListMenu from "@/components/Common/DropdownListMenu";

export default function WarningsMapButton() {
    const { warnings } = useWarningsProvider();
    const items = [{
        id: 1,
        element: <WarningsPanel></WarningsPanel>,
    }];
    return (
        warnings.length > 0 &&
        <DropdownListMenu
            items={items}
            triggerElement={<ExclamationTriangleIcon className="size-5 text-danger" aria-hidden="true"/>}
            side="bottom"
            portalElement="#layersMenu"
        ></DropdownListMenu>
    );
}