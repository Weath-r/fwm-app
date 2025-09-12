import { LoadingForecastMessages, LoadingMessages } from "@/types";
import { randomIndexFromArray } from "@/helpers/general";

type LoadingForecastProps = {
    i18n: any;
};

export default function LoadingForecastData(props: Readonly<LoadingForecastProps>) {
    const selectedLanguage = props.i18n.language;

    const weatherMessages: LoadingMessages = {
        en: LoadingForecastMessages.en,
        el: LoadingForecastMessages.el,
    };

    const randomIndex = randomIndexFromArray(weatherMessages[selectedLanguage]);
    return (
        <div className="my-4 flex h-[260px] w-full items-center justify-center">
            <h3 className="my-2 font-semibold text-primary">
                {weatherMessages[selectedLanguage][randomIndex]}
            </h3>
        </div>
    );
}