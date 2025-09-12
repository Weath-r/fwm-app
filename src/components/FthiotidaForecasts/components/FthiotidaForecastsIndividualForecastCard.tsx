import { useRef } from "react";
import { Measurements } from "@/types";
import { FthiotidaForecastObject } from "@/types";
import Image from "next/image";
import { useAnimeIcon } from "@/hooks/useAnimeIcon";
import SvgInline from "@/components/Common/SvgInline";
import { assetUrl } from "@/helpers/assetsHandling";
import { animationPerAsset } from "@/helpers/animations";
import { LocationMetadata } from "@/helpers/fthiotidaForecastLocations";

type ForecastIndividualCardProps = {
    metadata: LocationMetadata;
    forecast: FthiotidaForecastObject;
    i18n: any;
};

export default function FthiotidaForecastsIndividualCard(props: Readonly<ForecastIndividualCardProps>) {
    const icon = useRef<HTMLElement | null>(null);
    const animationParameters = animationPerAsset[props.forecast.weatherConditions?.value || "sunny"];
    useAnimeIcon({ 
        target: icon, 
        parameters: animationParameters, 
    });

    const selectedLanguage = props.i18n.language;

    return (
        <section>
            <div className="w-100 rounded-lg bg-white p-4 shadow-lg">
                <h3 className="border-b-2 border-primary/10 pb-2 text-sm font-semibold text-primary">
                    {props.i18n.getFixedT(selectedLanguage, "forecasts")(`FthiotidaForecasts.locations.${props.metadata.value}`)}
                </h3>
                <div className="size-64">
                    <div className="flex size-full flex-col gap-2">
                        <div className="relative size-full">
                            {props.metadata.assetCode && <Image
                                src={`/assets/map_shapes/${props.metadata.assetCode}.png`}
                                alt={`${props.i18n.getFixedT(selectedLanguage, "forecasts")(`FthiotidaForecasts.locations.${props.metadata.value}`)} ${props.i18n.getFixedT(selectedLanguage, "forecasts")("forecast")}`}
                                width={260}
                                height={260}
                                className="absolute z-0 object-cover"
                            />}
                            <div 
                                className="absolute z-[1] size-20"
                                style={props.metadata.style}
                            >
                                {props.forecast.weatherConditions && 
                                    <section
                                        ref={icon}
                                    >
                                        <SvgInline 
                                            path={assetUrl(props.forecast.weatherConditions.icon)} className={"mr-1 size-full"}
                                        ></SvgInline> 
                                    </section>    
                                }
                            </div>
                        </div>
                        <div className="relative z-10 ml-auto flex flex-col items-start gap-1 rounded-lg bg-white/75 p-2 shadow-lg">
                            <p className="font-semibold text-danger">
                                {props.i18n.getFixedT(selectedLanguage, "forecasts")("FthiotidaForecasts.highT")} <span className="ml-2 inline-block text-primary">{props.forecast.tmax} {Measurements.CELCIUS}</span>
                            </p>
                            <p className="font-semibold text-success">
                                {props.i18n.getFixedT(selectedLanguage, "forecasts")("FthiotidaForecasts.lowT")} <span className="ml-2 inline-block text-primary">{props.forecast.tmin} {Measurements.CELCIUS}</span>
                            </p>
                            {props.forecast.snow && props.forecast.snow > 0 && 
                                <p className="text-sm font-semibold text-primary">
                                    {props.i18n.getFixedT(selectedLanguage, "forecasts")("FthiotidaForecasts.snow")}: <span className="text-md ml-2 inline-block lowercase">{props.forecast.snow} {Measurements.CM}</span>
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}