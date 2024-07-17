import { WarningHazard } from "@/types";
import HazardIcon from "./HazardIcon";

type WarningHazardsLegendType = {
    hazards: WarningHazard[];
};

export default function WarningHazardsLegend(props: Readonly<WarningHazardsLegendType>) {
    const { hazards } = props;
    return (
        <div className="flex flex-col rounded bg-white p-4">
            <h2 className="text-lg font-bold text-primary">
                Hazards
            </h2>
            <div className="mt-2">
                {hazards.map(hazard => {
                    return (
                        <div 
                            className="border-b-1 my-2 flex items-center justify-between border-light_white text-primary"
                            key={hazard.label}
                        >
                            <p>
                                {hazard.label}
                            </p>
                            <HazardIcon
                                asset={hazard.asset} 
                                label={hazard.label} 
                                className="size-6 fill-primary"
                            ></HazardIcon>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}