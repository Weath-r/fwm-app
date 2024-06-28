import { useStationsProvider } from "@/providers/StationsProvider";
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
    const { warnings } = useStationsProvider();
    const today = dayWithNameUtil(new Date());
    
    const panelContent = warnings.map(elem => {
        return (
            <div 
                className="flex flex-col"
                key={elem.location}
            >
                <h3 className="text-primary text-lg my-4">
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
                            className="rounded-r-lg bg-white text-primary p-4 my-1 border-l-4"
                            key={warning.id}
                            style={{
                                "borderColor": warning.level_id.color,
                            }}
                        >
                            <div className="flex items-center">
                                <div 
                                    className="mr-2 w-9 h-9 my-2 rounded-lg p-2"
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
                                <p className="text-primary opacity-60 text-sm ml-2">
                                    {createdDate}
                                </p>
                                <div className="ml-auto">
                                    <p className="text-xs text-primary opacity-60">
                                        {printIssuedByUser(warning.meteoalarm_warning_id)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col mt-2">
                                <p className="text-sm">
                                    {warning.description_en}
                                </p>
                                <p className="text-xs pt-2 mt-3 opacity-60 border-t border-secondary">
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
        <section className="flex flex-col bg-white/90 lg:bg-white/70 overflow-hidden w-full h-full lg:w-1/5 lg:absolute lg:top-0 lg:right-0 lg:z-[410]">
            <div className="flex flex-col p-3 h-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-primary font-bold text-lg">
                        Active warnings
                        <small className="block opacity-60 text-xs">
                            {today}
                        </small>
                    </h2>
                    <BaseControlledModal
                        trigger={
                            <SvgInline path="icons/circle-info.svg" className="fill-primary w-3 h-3"></SvgInline>
                        }
                    >
                        <section>
                            <WarningHazardsLegend hazards={hazards}></WarningHazardsLegend>
                            <WarningLevelsLegend levels={warningLevels}></WarningLevelsLegend>
                        </section>
                    </BaseControlledModal>
                </div>
                <div className="overflow-y-auto flex-1 pb-4">
                    {panelContent}
                </div>
            </div>
        </section>
    );

    return warnings.length > 0 && panelLayout;
}
