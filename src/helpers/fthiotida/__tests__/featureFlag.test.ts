import { FTHIOTIDA_FORECASTS_FLAG, isFthiotidaForecastsEnabled } from "../featureFlag";

describe("isFthiotidaForecastsEnabled", () => {
    it("is enabled only when the flag's enable is true", () => {
        expect(isFthiotidaForecastsEnabled({ [FTHIOTIDA_FORECASTS_FLAG]: { enable: true } })).toBe(
            true
        );
    });

    it.each([
        ["disabled", { [FTHIOTIDA_FORECASTS_FLAG]: { enable: false } }],
        ["missing", {}],
        ["without enable", { [FTHIOTIDA_FORECASTS_FLAG]: {} }],
        ["null config", { [FTHIOTIDA_FORECASTS_FLAG]: null }],
        ["truthy but not true", { [FTHIOTIDA_FORECASTS_FLAG]: { enable: "true" } }],
    ])("is disabled when the flag is %s", (_label, featureFlags) => {
        expect(isFthiotidaForecastsEnabled(featureFlags)).toBe(false);
    });
});
