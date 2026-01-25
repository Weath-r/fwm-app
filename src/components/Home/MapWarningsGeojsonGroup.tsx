import { GroupedWarnings } from "@/types";
import BaseGeoJSON from "../BaseComponents/BaseGeoJSON";
import { FeatureGroup } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { useRef, useEffect, useMemo } from "react";
import { FeatureGroup as LeafletFeatureGroup } from "leaflet";

type GeoJsonGroupTypes = {
    groupedWarnings: GroupedWarnings[];
    shouldRender: boolean;
};
export default function MapWarningsGeojsonGroup(props: GeoJsonGroupTypes) {
    const featureGroupRef = useRef<LeafletFeatureGroup>(null);
    const map = useMap();

    const sortedWarnings = useMemo(
        () => [...props.groupedWarnings].sort((a, b) => a.order - b.order),
        [props.groupedWarnings]
    );

    const paneNames = useMemo(
        () => sortedWarnings.map((_, index) => `warningGroup_${index}`),
        [sortedWarnings]
    );

    useEffect(() => {
        if (!map) return;

        paneNames.forEach((PANE, index) => {
            if (!map.getPane(PANE)) {
                map.createPane(PANE);
            }

            const mapPane = map.getPane(PANE);
            if (mapPane) {
                mapPane.style.zIndex = `${1 + index}`;
            }
        });
    }, [map, paneNames]);

    return (
        <FeatureGroup ref={featureGroupRef}>
            {props.shouldRender &&
                sortedWarnings.map((elem, index) => {
                    return (
                        <BaseGeoJSON
                            key={elem.assetName}
                            assetId={elem.geojson}
                            fillColor={elem.warningLevel.color}
                            pane={paneNames[index]}
                        ></BaseGeoJSON>
                    );
                })}
        </FeatureGroup>
    );
}
