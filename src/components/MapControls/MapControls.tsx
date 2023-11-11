import { useMap } from "react-leaflet/hooks";
import Btn from "@/components/Common/Btn";
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
        <div className="flex shadow-md bg-white rounded">
            <Btn 
                color="black"
                className={"mr-1"}
                handleClick={btnZoomIn}
            >
                <PlusCircleIcon className="h-8 w-8 p-1"></PlusCircleIcon>
            </Btn>
            <Btn 
                color="black"
                handleClick={btnZoomOut}
            >
                <MinusCircleIcon className="h-8 w-8 p-1"></MinusCircleIcon>
            </Btn>
        </div>
    );
}