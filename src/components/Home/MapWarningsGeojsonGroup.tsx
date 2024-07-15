import { GroupedWarnings } from "@/types";
import BaseGeoJSON from "../BaseComponents/BaseGeoJSON";
import { FeatureGroup } from "react-leaflet";
import { useMap } from "react-leaflet/hooks";
import { useRef, useState, useEffect } from "react";
import { FeatureGroup as LeafletFeatureGroup } from "leaflet";

type GeoJsonGroupTypes = {
    groupedWarnings: GroupedWarnings[];
    shouldRender: boolean;
};
export default function MapWarningsGeojsonGroup(props: GeoJsonGroupTypes) {
    const featureGroupRef = useRef<LeafletFeatureGroup>(null);
    const [panes, setPanes] = useState<string[]>([]);
    const map = useMap();
    useEffect(() => {
        const newPanes: string[] = [];
        const sortedWarnings = [...props.groupedWarnings].sort((a, b) => a.order - b.order);
        sortedWarnings.forEach((group, index) => {
            const PANE = `warningGroup_${index}`;
            map.createPane(PANE);
            const mapPane: HTMLElement | undefined = map.getPane(PANE);
            if (mapPane) {
                mapPane.style.zIndex = `${1 + index}`;
                newPanes.push(PANE);
            } else {
                console.log(`Pane ${PANE} not found.`);
            }
        });

        setPanes(newPanes);
    }, []);

    return (<FeatureGroup ref={featureGroupRef}>
        {(props.shouldRender && props.groupedWarnings.map((elem,index) => {
            return <BaseGeoJSON
                key={elem.assetName}
                assetId={elem.geojson}
                fillColor={elem.warningLevel.color}
                pane={panes[index]}
            ></BaseGeoJSON>;
        }))}
    </FeatureGroup>
    );
};