import { useWarningsProvider } from "@/providers/StationsProvider";
import { timeFromNowUtil, timeOnlyUtil, dayWithNameUtil } from "@/utils/dateTimeUtils";
import { useGeneralStore } from "@/stores/settingsStore";
import SvgInline from "@/components/Common/SvgInline";
import BaseControlledModal from "@/components/BaseComponents/BaseControlledModal";
import WarningHazardsLegend from "./components/WarningHazardsLegend";
import WarningLevelsLegend from "./components/WarningLevelsLegend";
import HazardIcon from "./components/HazardIcon";

import { printIssuedByUser } from "./utils/warningsHelpers";

export default function WarningsPanel() {
    const { hazards, warningLevels } = useGeneralStore();
    const { warnings } = useWarningsProvider();
    const today = dayWithNameUtil(new Date());
    
    const panelContent = warnings.map(elem => {
        return (
            <div 
                className="flex flex-col"
                key={elem.location}
            >
                <h3 className="my-4 text-lg text-primary">
                    {elem.location}
                </h3>
                {elem.warnings.map(warning => {
                    const startingDate = timeOnlyUtil(warning.start_date);
                    const endingDate = timeOnlyUtil(warning.end_date);
                    const createdDate = timeFromNowUtil(warning.date_created);
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
                        <div 
                            className="my-1 rounded-r-lg border-l-4 bg-white p-4 text-primary"
                            key={warning.id}
                            style={{
                                "borderColor": warning.level_id.color,
                            }}
                        >
                            <div className="flex items-center">
                                <div 
                                    className="my-2 mr-2 size-9 rounded-lg p-2"
                                    style={{
                                        "backgroundColor": warning.level_id.color,
                                    }}
                                >
                                    <HazardIcon
                                        asset={warning.hazard_id.asset}
                                        label={warning.hazard_id.label}
                                        className={theme.svgFillColor}
                                    ></HazardIcon>
                                </div>
                                <p className="ml-2 text-sm text-primary opacity-60">
                                    {createdDate}
                                </p>
                                <div className="ml-auto">
                                    <p className="text-xs text-primary opacity-60">
                                        {printIssuedByUser(warning.meteoalarm_warning_id)}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 flex flex-col">
                                <p className="text-sm">
                                    {warning.description_en}
                                </p>
                                <p className="mt-3 border-t border-secondary pt-2 text-xs opacity-60">
                                    Valid for {startingDate} - {endingDate}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    });

    const panelLayout = (
        <section className="flex size-full flex-col overflow-hidden bg-white/90 lg:absolute lg:right-0 lg:top-0 lg:z-[410] lg:w-1/5 lg:bg-white/70">
            <div className="flex h-full flex-col p-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-primary">
                        Active warnings
                        <small className="block text-xs opacity-60">
                            {today}
                        </small>
                    </h2>
                    <BaseControlledModal
                        trigger={
                            <SvgInline path="icons/circle-info.svg" className="size-3 fill-primary"></SvgInline>
                        }
                    >
                        <section>
                            <WarningHazardsLegend hazards={hazards}></WarningHazardsLegend>
                            <WarningLevelsLegend levels={warningLevels}></WarningLevelsLegend>
                        </section>
                    </BaseControlledModal>
                </div>
                <div className="flex-1 overflow-y-auto pb-4">
                    {panelContent}
                </div>
            </div>
        </section>
    );

    return warnings.length > 0 && panelLayout;
}
