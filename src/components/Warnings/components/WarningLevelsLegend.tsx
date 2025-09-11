import { WarningLevel } from "@/types";
import { translatedContent } from "@/utils/transformTranslations";

type WarningLevelsLegendType = {
    levels: WarningLevel[];
    i18n: any;
};

export default function WarningLevelsLegend(props: Readonly<WarningLevelsLegendType>) {
    const { levels, i18n } = props;
    const selectedLanguage = i18n.language;
    const translatedLevels = translatedContent({
        data: levels,
        selectedLanguage,
    });
    
    return (
        <div className="flex flex-col rounded bg-white p-4">
            <h2 className="text-lg font-bold text-primary">
                {i18n.getFixedT(selectedLanguage, "warnings")("warningLevels")}
            </h2>
            <div className="mt-2">
                {translatedLevels.map(level => {
                    return (
                        <div 
                            className="border-b-1 my-2 flex items-center justify-between border-light_white text-primary"
                            key={level.label}
                        >
                            <p>
                                {level.label}
                            </p>
                            <div className="size-4 rounded-lg"
                                style={{
                                    backgroundColor: level.color,
                                }}
                            ></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}