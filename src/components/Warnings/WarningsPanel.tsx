import { useStationsProvider } from "@/providers/StationsProvider";
import { formatDateToNumeric } from "@/utils/weatherDataFormatUtils";
import CollapsedCard from "../Common/CollapsedCard";
import SvgInline from "../Common/SvgInline";
import { assetUrl } from "@/helpers/assetsHandling";

export default function WarningsPanel() {
    const { warnings } = useStationsProvider();

    const panels = warnings.map((warning) => {
        const startingDate = formatDateToNumeric(warning.start_date);
        const endingDate = formatDateToNumeric(warning.end_date);
        const imagePath = assetUrl(warning.hazard_id.asset);
        const theme = warning.level_id.id > 1 
            ? {
                collapseCard: "dark",
                textColor: "text-white",
                svgFillColor: "fill-white",
            } : {
                collapseCard: "light",
                textColor: "text-primary",
                svgFillColor: "fill-primary",
            };

        return (
            <CollapsedCard
                key={warning.id}
                theme={theme.collapseCard}
                title={
                    <div className="flex items-center justify-between gap-2 w-full">
                        <p className={`font-bold text-left ${theme.textColor}`}>
                            {warning.warning_location_id.label}
                            <span className="block font-medium">
                                {warning.level_id.label} warning
                            </span>
                        </p>
                        <div className="mr-1 w-8 h-8">
                            <SvgInline 
                                path={imagePath} 
                                title={warning.hazard_id.label} 
                                className={theme.svgFillColor}
                            ></SvgInline>
                        </div>
                    </div>
                }
                style={{
                    "backgroundColor": warning.level_id.color,
                }}
                class="w-full lg:w-80 mb-1 shadow-lg p-[5px] pt-0"
            >
                <div className="rounded-lg px-2 py-3 bg-white text-primary">
                    <p 
                        className="text-sm"
                    >
                        {warning.description_en}
                    </p>
                    <p className="text-xs mt-3 pt-1 opacity-60 border-t border-secondary">
                        {startingDate} - {endingDate}
                    </p>
                </div>
            </CollapsedCard>
        );
    });

    return (
        <section className="absolute top-1 right-1 flex flex-col z-[410] w-full lg:w-auto">
            {panels}
        </section>
    );
}
