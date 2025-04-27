import L, {  MarkerCluster } from "leaflet";
import { assetUrl } from "@/helpers/assetsHandling";

type MarkerCustomAttrs = {
    weatherDescription: string;
    assetId: string;
    stationName?: string;
};

type ClusterImage = {
    imgUrl: string;
    description: string;
};

type ClusterImageReducer = {
    imgUrl: string;
    description: string;
    sum: number;
};

export const createClusterCustomIcon = function (cluster: MarkerCluster) {
    const markersInCluster: L.Marker[] = cluster.getAllChildMarkers();
    const iconsOfCluster: ClusterImage[] = [];
    markersInCluster.forEach((element) => {
        if (element.options.customAttr) {
            const { assetId, weatherDescription }: MarkerCustomAttrs = element.options.customAttr;
            const renderImg = assetUrl(assetId);
            iconsOfCluster.push({
                imgUrl: renderImg,
                description: weatherDescription,
            });
        }
    });

    const summarizedIcons = iconsOfCluster.reduce((acc, curr) => {
        const foundIndex = acc.findIndex((icon) => icon.imgUrl === curr.imgUrl);
        
        if (foundIndex !== -1) {
            acc[foundIndex].sum += 1;
        } else {
            acc.push({
                ...curr,
                sum: 1,
            });
        }
        
        return acc;
    }, [] as ClusterImageReducer[]).sort((a, b) => b.sum - a.sum);

    return L.divIcon({
        html: `<div class="flex justify-center items-center">
            <div class="w-[58px] h-[58px] relative">
                <img src="${summarizedIcons[0].imgUrl}" class="w-full h-full" alt="${summarizedIcons[0].description}" />
                <div class="absolute bottom-0 right-0 bg-primary rounded px-1">
                <p class="text-white">
                    ${cluster.getChildCount()}
                </p>
            </div>
            </div>
        </div>`,
        className: "",
        iconSize: L.point(33, 33, true),
    });
};
