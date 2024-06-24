import { WarningHazard } from "@/types";
import { assetUrl } from "@/helpers/assetsHandling";
import SvgInline from "@/components/Common/SvgInline";

type WarningHazardsLegendType = {
    hazards: WarningHazard[];
};

export default function WarningHazardsLegend(props: Readonly<WarningHazardsLegendType>) {
    const { hazards } = props;
    return (
        <div className="bg-white rounded flex flex-col p-4">
            <h2 className="text-primary text-lg font-bold">Hazards</h2>
            <div className="mt-2">
                {hazards.map(hazard => {
                    const imagePath = assetUrl(hazard.asset);
                    return (
                        <div 
                            className="flex items-center justify-between text-primary my-2 border-b-1 border-light_white"
                            key={hazard.label}
                        >
                            <p>
                                {hazard.label}
                            </p>
                            <SvgInline 
                                path={imagePath} 
                                title={hazard.label} 
                                className="w-6 h-6 fill-primary"
                            ></SvgInline>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}