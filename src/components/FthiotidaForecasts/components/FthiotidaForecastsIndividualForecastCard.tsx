import { useRef } from "react";

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
};

export default function FthiotidaForecastsIndividualCard(props: Readonly<ForecastIndividualCardProps>) {
    const icon = useRef<HTMLElement | null>(null);
    const animationParameters = animationPerAsset[props.forecast.weatherConditions?.value || "sunny"];
    useAnimeIcon({ 
        target: icon, 
        parameters: animationParameters, 
    });

    return (
        <section>
            <div className="w-100 rounded-lg bg-white p-4 shadow-lg">
                <h3 className="text-sm font-semibold text-primary">
                    {`${props.metadata.label}`}
                </h3>
                <div className="size-64">
                    <div className="flex size-full flex-col gap-2">
                        <div className="relative size-full">
                            {props.metadata.assetCode && <Image
                                src={`/assets/map_shapes/${props.metadata.assetCode}.png`}
                                alt={`${props.metadata.label} Forecast`}
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
                                H <span className="ml-2 inline-block text-primary">{props.forecast.tmax}°C</span>
                            </p>
                            <p className="font-semibold text-success">
                                L <span className="ml-2 inline-block text-primary">{props.forecast.tmin}°C</span>
                            </p>
                            {props.forecast.snow && props.forecast.snow > 0 && 
                                <p className="text-sm font-semibold text-primary">
                                    Snow: <span className="text-md ml-2 inline-block">{props.forecast.snow} cm</span>
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}