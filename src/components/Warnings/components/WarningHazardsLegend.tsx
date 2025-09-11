import { WarningHazard } from "@/types";
import HazardIcon from "./HazardIcon";
import { translatedContent } from "@/utils/transformTranslations";

type WarningHazardsLegendType = {
    hazards: WarningHazard[];
    i18n: any;
};

export default function WarningHazardsLegend(props: Readonly<WarningHazardsLegendType>) {
    const { hazards, i18n } = props;
    const selectedLanguage = i18n.language;

    const translatedHazards = translatedContent({
        data: hazards,
        selectedLanguage,
    });

    return (
        <div className="flex flex-col rounded bg-white p-4">
            <h2 className="text-lg font-bold text-primary">
                {i18n.getFixedT(selectedLanguage, "warnings")("hazardsTitle")}
            </h2>
            <div className="mt-2">
                {translatedHazards.map(hazard => {
                    return (
                        <div 
                            className="border-b-1 my-2 flex items-center justify-between border-light_white text-primary"
                            key={hazard.label}
                        >
                            <p>
                                {hazard.label}
                            </p>
                            {hazard.asset && <HazardIcon
                                asset={hazard.asset} 
                                label={hazard.label} 
                                className="size-6 fill-primary"
                            ></HazardIcon>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}