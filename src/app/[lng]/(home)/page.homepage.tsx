import { Suspense } from "react";
import { getT } from "@/i18n";
import { getConfiguration } from "@/services/getConfiguration";
import MajorCitiesSection from "@/components/Home/MajorCities/MajorCitiesSection";
import MajorCitiesSkeleton from "@/components/Home/MajorCities/MajorCitiesSkeleton";
import HomepageAboutSection from "@/components/Home/About/HomepageAboutSection";
import HomepageWarningsSection from "@/components/Home/Warnings/HomepageWarningsSection";
import HomepageWarningsSkeleton from "@/components/Home/Warnings/HomepageWarningsSkeleton";
import HomepageStationsSection from "@/components/Home/Stations/HomepageStationsSection";
import HomepageStationsSkeleton from "@/components/Home/Stations/HomepageStationsSkeleton";

type MajorCitiesFlag = { enable: boolean; stationIds: number[] };
type HomepageProps = { lng: string };

export default async function Homepage({ lng }: HomepageProps) {
    const { t } = await getT("homepage");
    const featureFlags = await getConfiguration();

    const majorCities = featureFlags.major_cities as MajorCitiesFlag | undefined;
    const majorCityIds = majorCities?.enable ? majorCities.stationIds : [];

    const majorCitiesHeading = t("majorCities.heading");
    const majorCitiesSubheading = t("majorCities.subheading");

    return (
        <main className="h-fit container mx-auto flex flex-col gap-4 py-8">
            <h1 className="text-xl md:text-2xl font-bold text-primary px-1">{t("h1")}</h1>

            {majorCityIds.length > 0 && (
                <Suspense
                    fallback={
                        <MajorCitiesSkeleton
                            heading={majorCitiesHeading}
                            subheading={majorCitiesSubheading}
                        />
                    }
                >
                    <MajorCitiesSection
                        stationIds={majorCityIds}
                        lng={lng}
                        heading={majorCitiesHeading}
                        subheading={majorCitiesSubheading}
                    />
                </Suspense>
            )}

            <Suspense fallback={<HomepageWarningsSkeleton lng={lng} />}>
                <HomepageWarningsSection lng={lng} />
            </Suspense>

            <Suspense fallback={<HomepageStationsSkeleton lng={lng} />}>
                <HomepageStationsSection lng={lng} />
            </Suspense>

            <HomepageAboutSection />
        </main>
    );
}
