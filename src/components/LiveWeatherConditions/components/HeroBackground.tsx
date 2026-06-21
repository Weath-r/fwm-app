import Image from "next/image";
import { resolveBackdrop } from "@/helpers/liveWeather/heroBackdrop";
import { getHeroMood } from "@/helpers/liveWeather/heroMood";

type HeroBackgroundProps = {
    headerBackground?: string | null;
    weatherDescription: string;
    dateCreated: string;
    altText: string;
};

// Used when the station has no usable `header_bg` at all.
const BRAND_FALLBACK = "linear-gradient(160deg, #2B3D49, #9FB3BF)";

/**
 * Two composited layers behind the hero content:
 *   1. the station backdrop (photo / solid color / brand fallback)
 *   2. a weather + time-of-day mood gradient that guarantees text contrast
 *
 * Both layers sit on negative z-index inside the hero's isolated stacking
 * context, so the hero content renders above them.
 */
export default function HeroBackground({
    headerBackground,
    weatherDescription,
    dateCreated,
    altText,
}: Readonly<HeroBackgroundProps>) {
    const backdrop = resolveBackdrop(headerBackground);
    const mood = getHeroMood(weatherDescription, dateCreated);

    return (
        <>
            <div
                className="absolute inset-0 -z-20 overflow-hidden"
                aria-hidden={backdrop.kind !== "image"}
            >
                {backdrop.kind === "image" && (
                    <Image
                        src={backdrop.value}
                        alt={altText}
                        fill
                        priority
                        unoptimized
                        sizes="100vw"
                        className="object-cover object-center"
                        style={{ filter: mood.backdropFilter }}
                    />
                )}
                {backdrop.kind === "color" && (
                    <div
                        className="size-full"
                        style={{ backgroundColor: backdrop.value, filter: mood.backdropFilter }}
                    />
                )}
                {backdrop.kind === "none" && (
                    <div className="size-full" style={{ background: BRAND_FALLBACK }} />
                )}
            </div>

            <div
                className="absolute inset-0 -z-10 transition-[background] duration-500"
                style={{ background: mood.gradient }}
                aria-hidden
                suppressHydrationWarning
            />
        </>
    );
}
