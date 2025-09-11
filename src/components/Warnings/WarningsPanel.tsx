import { useWarningsProvider } from "@/providers/StationsProvider";
import { dateWithTime, dayWithNameUtil } from "@/utils/dateTimeUtils";
import { useGeneralStore } from "@/stores/settingsStore";
import SvgInline from "@/components/Common/SvgInline";
import BaseDialog from "@/components/BaseComponents/BaseDialog";
import WarningHazardsLegend from "./components/WarningHazardsLegend";
import WarningLevelsLegend from "./components/WarningLevelsLegend";
import HazardIcon from "./components/HazardIcon";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon, ClockIcon } from "@heroicons/react/20/solid";

import { printIssuedByUser } from "./utils/warningsHelpers";
import { useState } from "react";
import { useT } from "@/i18n/client";
  
type ClampState = boolean[][];

export default function WarningsPanel() {
    const { hazards, warningLevels } = useGeneralStore();
    const { warnings } = useWarningsProvider();
    const today = dayWithNameUtil(new Date());
    
    const { i18n } = useT("warnings");
    const selectedLanguage = i18n.language;

    const [clampStates, setClampStates] = useState<ClampState>(
        warnings.map(group => group.warnings.map(() => false))
    );
    
    const toggleClamp = (groupIndex: number, warningIndex: number) => {
        setClampStates((prevClampStates) => {
            const newClampStates = [...prevClampStates];
            newClampStates[groupIndex] = [...newClampStates[groupIndex]];
            newClampStates[groupIndex][warningIndex] = !newClampStates[groupIndex][warningIndex];
            return newClampStates;
        });
    };
    const panelContent = 
        warnings.map((elem, index) => {
            return (
                <section 
                    className="flex flex-col" 
                    key={elem.location}
                >
                    <div 
                        className="flex items-center"
                    >
                        <h3 className="my-4 text-lg font-bold text-primary">
                            {elem.location}
                        </h3>
                    </div>
                    <Accordion.Root
                        type="single"
                        defaultValue="item-1"
                    >
                        {elem.warnings.map((warning,subIndex) => {
                            const startingDate = dateWithTime(warning.start_date);
                            const endingDate = dateWithTime(warning.end_date);
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
                            
                                <Accordion.Item 
                                    key={warning.meteoalarm_warning_id}
                                    value={`item-${subIndex+1}`}
                                    className="my-2 pl-2 text-primary"
                                >
                                    <Accordion.Header>
                                        <Accordion.Trigger 
                                            className="AccordionTrigger w-full text-lg"
                                        >
                                            <div className="flex items-center">
                                                <div className="flex w-full items-center">
                                                    <div 
                                                        className="mr-1 size-9 rounded-lg p-2"
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
                                                    <p className="ml-1 text-left text-sm font-bold text-primary">
                                                        {warning.hazard_id.label}
                                                        <span className="block text-xs font-medium opacity-60">
                                                            {i18n.getFixedT(selectedLanguage, "warnings")("tableData.issuedBy")} {printIssuedByUser(warning.meteoalarm_warning_id)}
                                                        </span>
                                                    </p>
                                                </div>
                                                <ChevronDownIcon className="AccordionChevron ml-auto size-6" aria-hidden />
                                            </div>
                                        </Accordion.Trigger>
                                    </Accordion.Header>
                                    <Accordion.Content>
                                        <div className="mt-2 flex flex-col">
                                            <p
                                                className={`w-full text-sm ${
                                                    clampStates[index][subIndex] ? "" : "line-clamp-3"
                                                }`}
                                                onClick={() => toggleClamp(index, subIndex)}
                                                style={{ cursor: "pointer" }}
                                                title={
                                                    clampStates[index][subIndex]
                                                        ? "Click to see less"
                                                        : "Click to see more"
                                                }
                                            >
                                                {warning[`description_${selectedLanguage}`]}
                                            </p>
                                            <p className="mt-3 flex items-center border-t border-secondary pt-2 text-xs opacity-60">
                                                <ClockIcon className="mr-1 size-3"></ClockIcon>{startingDate} - {endingDate}
                                            </p>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion.Root>
                </section>
            );
        });
        
    const panelLayout = (
        <section className="flex size-full flex-col">
            <div className="flex w-full flex-col p-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-primary">
                        {i18n.getFixedT(selectedLanguage, "warnings")("activeWarnings")}
                        <small className="block text-xs opacity-60">
                            {today}
                        </small>
                    </h2>
                    <BaseDialog 
                        dialogTitle={<div className="text-sm font-bold uppercase text-primary">{i18n.getFixedT(selectedLanguage, "warnings")("information")}</div> }
                        trigger={
                            <SvgInline path="icons/circle-info.svg" className="size-3 fill-primary"></SvgInline>
                        }
                    >
                        <section>
                            <WarningHazardsLegend hazards={hazards} i18n={i18n}></WarningHazardsLegend>
                            <WarningLevelsLegend levels={warningLevels} i18n={i18n}></WarningLevelsLegend>
                        </section>
                    </BaseDialog>
                </div>
                <div className="max-h-[66vh] w-full">
                    {panelContent}
                </div>
            </div>
        </section>
    );

    return warnings.length > 0 && panelLayout;
}
