import { assetUrl } from "@/helpers/assetsHandling";

/**
 * The station hero backdrop is driven by `station.header_bg`, which is loosely
 * typed (`string`) and in practice can be one of:
 *  - an asset id / filename  -> render the photo via `assetUrl`
 *  - a hex color (e.g. #fff)  -> render a solid color surface
 *  - empty / missing          -> fall back to a synthesized brand gradient
 *
 * The mood gradient always sits on top, so every case still looks intentional.
 */
export type Backdrop =
    | { kind: "image"; value: string }
    | { kind: "color"; value: string }
    | { kind: "none" };

export const resolveBackdrop = (headerBackground?: string | null): Backdrop => {
    const trimmed = headerBackground?.trim();

    if (!trimmed) {
        return { kind: "none" };
    }

    if (trimmed.startsWith("#")) {
        return { kind: "color", value: trimmed };
    }

    return { kind: "image", value: assetUrl(trimmed) };
};
