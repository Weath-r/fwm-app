import type { FeatureFlags } from "@/types";

export const FTHIOTIDA_FORECASTS_FLAG = "home_fthiotida_forecasts";

export const isFthiotidaForecastsEnabled = (featureFlags: FeatureFlags): boolean =>
    featureFlags[FTHIOTIDA_FORECASTS_FLAG]?.enable === true;
