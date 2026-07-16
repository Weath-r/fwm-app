import { DataService } from "@/services/DataService";
import { WeatherWarnings } from "@/types";
import { translatedContent } from "@/utils/transformTranslations";
import HomepageWarningsSectionView, {
    type LocationSummary,
} from "@/components/Home/Warnings/HomepageWarningsSectionView";

type HomepageWarningsSectionProps = {
    lng: string;
};

function normalizeWarnings(warnings: WeatherWarnings[], language: string): WeatherWarnings[] {
    return warnings.map((warning) => {
        const [hazard] = translatedContent({
            data: [warning.hazard_id],
            selectedLanguage: language,
        });
        const [level] = translatedContent({ data: [warning.level_id], selectedLanguage: language });
        const [location] = translatedContent({
            data: [warning.warning_location_id],
            selectedLanguage: language,
        });
        return {
            ...warning,
            hazard_id: { ...warning.hazard_id, asset: hazard.asset || "", label: hazard.label },
            level_id: {
                ...warning.level_id,
                color: level.color || "",
                label: level.label,
                id: level.id ?? warning.level_id.id,
            },
            warning_location_id: { ...warning.warning_location_id, label: location.label },
        };
    });
}

function summarizeLocations(activeWarnings: WeatherWarnings[]): LocationSummary[] {
    const locationMap = activeWarnings.reduce<Record<string, LocationSummary>>(
        (accumulator, warning) => {
            const locationLabel = warning.warning_location_id.label;
            if (
                !accumulator[locationLabel] ||
                warning.level_id.id > accumulator[locationLabel].levelId
            ) {
                accumulator[locationLabel] = {
                    label: locationLabel,
                    color: warning.level_id.color,
                    level: warning.level_id.label,
                    levelId: warning.level_id.id,
                };
            }
            return accumulator;
        },
        {}
    );
    return Object.values(locationMap);
}

export default async function HomepageWarningsSection({ lng }: HomepageWarningsSectionProps) {
    const dataService = new DataService();
    const warnings = await dataService
        .fetchWeatherWarningsByCreatedDate("")
        .then((data) => normalizeWarnings(data, lng))
        .catch(() => [] as WeatherWarnings[]);

    const activeWarnings = warnings.filter((warning) => warning.level_id.id >= 1);
    const locationSummaries = summarizeLocations(activeWarnings);

    return (
        <HomepageWarningsSectionView
            lng={lng}
            activeWarnings={activeWarnings}
            locationSummaries={locationSummaries}
        />
    );
}
