import { useT } from "@/i18n/client";
import type { Sky } from "@/hooks/useSky";
import { signedMinutes } from "@/utils/sky";

export const useDaylightText = (sky: Sky) => {
    const { t } = useT("fthiotida");
    const length = t("daylight.length", {
        hours: Math.floor(sky.daylightMinutes / 60),
        minutes: sky.daylightMinutes % 60,
    });
    const change = signedMinutes(sky.daylightChangeMinutes);
    return {
        full: change ? `${length} · ${t("daylight.changeFromYesterday", { change })}` : length,
        short: change ? `${length} · ${t("daylight.changeShort", { change })}` : length,
    };
};
