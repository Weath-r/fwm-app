import CommonButton from "@/components/Common/CommonButton";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useMapStore } from "@/stores/mapStore";

export default function MapControls() {
    const map = useMapStore((state) => state.map);
    const btnZoomIn = () => {
        if (!map) return;
        const currentZoom = map.getZoom();
        return map.setZoom(currentZoom + 1);
    };
    const btnZoomOut = () => {
        if (!map) return;
        const currentZoom = map.getZoom();
        return map.setZoom(currentZoom - 1);
    };
    return (
        <div className="absolute bottom-2 left-2 z-[3]">
            {map && 
            <div className="flex rounded bg-white shadow-md">
                <CommonButton
                    color="primary"
                    className={"mr-1"}
                    handleClick={btnZoomIn}
                >
                    <PlusCircleIcon className="size-8 p-1"></PlusCircleIcon>
                </CommonButton>
                <CommonButton 
                    color="primary" 
                    handleClick={btnZoomOut}
                >
                    <MinusCircleIcon className="size-8 p-1"></MinusCircleIcon>
                </CommonButton>
            </div>
            }
        </div>
    );
}
