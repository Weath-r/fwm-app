import { useGeneralStore } from "@/stores/settingsStore";

import SvgInline from "@/components/Common/SvgInline";
import { Dialog, DialogTrigger, DialogContent } from "@/components/Common/CommonDialog";
import WarningHazardsLegend from "./components/WarningHazardsLegend";
import WarningLevelsLegend from "./components/WarningLevelsLegend";

type WarningsInformationModalProps = {
    i18n: any;
};

export default function WarningsInformationModal({ i18n } : WarningsInformationModalProps) {
    const { hazards, warningLevels } = useGeneralStore();
    const selectedLanguage = i18n.language;
    const dialogTitle = (<div className="text-sm font-bold uppercase text-primary">{i18n.getFixedT(selectedLanguage, "warnings")("information")}</div>);
    return (
        <Dialog>
            <DialogTrigger>
                <SvgInline path="icons/circle-info.svg" className="size-3 fill-primary"></SvgInline>
            </DialogTrigger>
            <DialogContent
                dialogTitle={dialogTitle}
            >
                <section>
                    <WarningHazardsLegend 
                        hazards={hazards} 
                        i18n={i18n}
                    ></WarningHazardsLegend>
                    <WarningLevelsLegend 
                        levels={warningLevels}
                        i18n={i18n}
                    ></WarningLevelsLegend>
                </section>
            </DialogContent>
        </Dialog>
    );
}