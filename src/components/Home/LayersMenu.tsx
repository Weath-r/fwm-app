import { CogIcon } from "@heroicons/react/24/solid";
import DropdownListMenu from "@/components/Common/DropdownListMenu";
import BaseToggle from "@/components/BaseComponents/BaseToggle";
import { useAppStore } from "@/hooks/useAppStore";

export default function LayersMenu() {
    const { setShowFavouriteStations, showFavouriteStations } = useAppStore();

    const items = [{
        id: 0,
        element:
            <div className="px-3 pt-2">
                <h4 className="text-xs font-bold uppercase text-primary">Options</h4>
            </div>,
    },{
        id: 1,
        element:
            <div className="px-3 py-4">
                <BaseToggle 
                    size="small"
                    clickHandler={() => setShowFavouriteStations(!showFavouriteStations)}
                    initialChecked={showFavouriteStations}
                >
                    <span className="mr-2">Favorite stations</span>
                </BaseToggle>
            </div>,
    }];
    return (
        <DropdownListMenu
            items={items}
            triggerElement={<CogIcon className="size-5 text-primary" aria-hidden="true"/>}
            side="bottom"
        ></DropdownListMenu>
    );
}