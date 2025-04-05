import CommonButton from "@/components/Common/CommonButton";
import { HeartIcon } from "@heroicons/react/24/solid";

import { useAppStore } from "@/hooks/useAppStore";

export function FavoriteStationButton() {
    const { activeStation, isStationFavourite, handleFavouriteStationButton } = useAppStore();
    return (
        <CommonButton
            handleClick={() => handleFavouriteStationButton(activeStation)}
            color={isStationFavourite(activeStation) ? "primary" : "secondary"}
        >
            <HeartIcon className="size-8 p-1" />
        </CommonButton>
    );
};