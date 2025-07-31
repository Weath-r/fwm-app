import { useRef } from "react";

import { FthiotidaForecastObject } from "@/types";
import { useAnimeIcon } from "@/hooks/useAnimeIcon";
import SvgInline from "@/components/Common/SvgInline";
import { animationPerAsset } from "@/helpers/animations";
import { LocationMetadata } from "@/helpers/fthiotidaForecastLocations";

type ForecastIndividualCardProps = {
    metadata: LocationMetadata;
    forecast: FthiotidaForecastObject;
};

export default function FthiotidaForecastsIndividualCard(props: Readonly<ForecastIndividualCardProps>) {
    const icon = useRef<HTMLElement | null>(null);
    const animationParameters = animationPerAsset[
        props.forecast.windDirection || "90"];
    useAnimeIcon({ 
        target: icon, 
        parameters: animationParameters, 
    });
    
    return (
        <div className="w-full rounded-lg bg-white p-4 shadow-md">
            <h3 className="text-sm font-semibold text-primary">
                {`${props.metadata.label}`}
            </h3>
            <div className="flex size-32 items-center justify-between gap-2">
                <section
                    ref={icon}
                    className="size-8 sm:size-10"
                    style={{
                        transform: `rotate(${props.forecast.windDirection}deg)`,
                    }}
                >
                    <SvgInline 
                        path="/icons/arrow-up.svg"
                        className={"size-full"}
                    ></SvgInline> 
                </section>
                <div className="flex shrink flex-col gap-1 p-2">
                    <p className="font-semibold text-danger">
                        H <span className="ml-2 inline-block text-primary">{props.forecast.wmax}Bft</span>
                    </p>
                    <p className="font-semibold text-success">
                        L <span className="ml-2 inline-block text-primary">{props.forecast.wmin}Bft</span>
                    </p>
                </div>
            </div>
        </div>
    );
}