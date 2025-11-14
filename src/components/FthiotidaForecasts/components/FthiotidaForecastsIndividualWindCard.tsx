import { useRef } from "react";
import { Measurements } from "@/types";
import { FthiotidaForecastObject } from "@/types";
import { useAnimeIcon } from "@/hooks/useAnimeIcon";
import SvgInline from "@/components/Common/SvgInline";
import { animationPerAsset } from "@/helpers/animations";
import { LocationMetadata } from "@/helpers/fthiotidaForecastLocations";

type ForecastIndividualCardProps = {
    metadata: LocationMetadata;
    forecast: FthiotidaForecastObject;
    i18n: any;
};

export default function FthiotidaForecastsIndividualCard(props: Readonly<ForecastIndividualCardProps>) {
    const icon = useRef<HTMLElement | null>(null);
    const animationParameters = animationPerAsset[
        props.forecast.windDirection || "90"];
    useAnimeIcon({ 
        target: icon, 
        parameters: animationParameters, 
    });
    
    const selectedLanguage = props.i18n.language;

    return (
        <div className="w-full rounded-lg bg-white p-4 shadow-md">
            <h3 className="text-sm font-semibold text-primary">
                {props.i18n.getFixedT(selectedLanguage, "forecasts")(`FthiotidaForecasts.locations.${props.metadata.value}`)}
            </h3>
            <div className="flex w-32 h-16 items-center justify-between gap-2">
                <section
                    ref={icon}
                    className="size-8 sm:size-10"
                    style={{
                        transform: `rotate(${props.forecast.windDirection}deg)`,
                    }}
                >
                    <SvgInline 
                        path="/icons/arrow-down.svg"
                        className={"size-full"}
                    ></SvgInline> 
                </section>
                <div className="flex shrink flex-col gap-1 p-2 bg-primary rounded">
                    <p className="font-semibold text-white text-sm">
                        {props.forecast.wmin} - {props.forecast.wmax} {Measurements.BFT}
                    </p>
                </div>
            </div>
        </div>
    );
}