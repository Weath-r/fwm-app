import { GroupedWarnings } from "@/types";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useT } from "@/i18n/client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/Common/CommonDialog";
import WarningsPanel from "@/components/Warnings/WarningsPanel";
import WarningsInformationModal from "@/components/Warnings/WarningsInformationModal";

type WeatherWarningBannerProps = {
    warnings: GroupedWarnings[];
};

export default function WeatherWarningsBanner({ warnings }: Readonly<WeatherWarningBannerProps>) {
    const { i18n } = useT("warnings");
    const selectedLanguage = i18n.language;
    return (
        <Dialog>
            <DialogTrigger className="w-full">
                <section className="bg-orange-500 w-10/12 md:w-2/3 lg:w-1/3 mx-auto rounded-lg p-2 shadow-md">
                    <div className="flex items-center">
                        <p className="text-white text-sm font-semibold">
                            {i18n.getFixedT(selectedLanguage, "warnings")("activeWarnings")}
                        </p>
                        <ArrowTopRightOnSquareIcon className="size-4 ml-auto" />
                    </div>
                </section>
            </DialogTrigger>
            <DialogContent
                scrollable={true}
                dialogTitle={
                    <span className="flex items-center gap-2">
                        <span className="text-primary font-bold">
                            {i18n.getFixedT(selectedLanguage, "warnings")("warningsPageTitle")}
                        </span>
                        <WarningsInformationModal i18n={i18n} />
                    </span>
                }
            >
                <WarningsPanel warnings={warnings} i18n={i18n} />
            </DialogContent>
        </Dialog>
    );
}
