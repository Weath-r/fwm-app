import { useMap } from "react-leaflet/hooks";
import CommonButton from "@/components/Common/CommonButton";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";

export default function MapControls() {
    const map = useMap();
    const btnZoomIn = () => {
        const currentZoom = map.getZoom();
        return map.setZoom(currentZoom + 1);
    };
    const btnZoomOut = () => {
        const currentZoom = map.getZoom();
        return map.setZoom(currentZoom - 1);
    };
    return (
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
    );
}
