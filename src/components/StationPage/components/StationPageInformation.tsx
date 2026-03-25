import { Measurements, WeatherStation } from "@/types";
import { calculateWindToBft } from "@/utils/weatherConvertUnits";
import { MapPinIcon, IdentificationIcon, MapIcon } from "@heroicons/react/24/solid";
import StationTypeLabel from "@/components/Common/General/StationTypeLabel";
import StationPageMapModal from "./StationPageMapModal";

type ExtremeValues = {
    maxValue: number;
    minValue: number;
    meanValue: number;
};

type StationPageInformationProps = {
    extremeTemperatureValues: ExtremeValues;
    extremeWindSpeedValues: ExtremeValues;
    stationMetadata: WeatherStation;
    rainyDays: number;
    i18n: any;
};

export default function StationPageInformation({
    extremeTemperatureValues,
    extremeWindSpeedValues,
    stationMetadata,
    rainyDays,
    i18n,
}: StationPageInformationProps) {
    const lang = i18n.language;

    return (
        <section>
            <h2 className="mb-2 text-lg font-bold text-primary">
                {i18n.getFixedT(lang, "station")("information.title")}
            </h2>
            <div className="flex items-center gap-3 text-primary pb-2 border-b-2 border-secondary">
                <StationPageMapModal
                    coordinates={stationMetadata.location?.coordinates || [0, 0]}
                    modalTitle={stationMetadata.name}
                >
                    <div className="flex items-center gap-1 cursor-pointer">
                        <MapIcon className="size-4 fill-primary"></MapIcon>
                        <p>{stationMetadata.prefecture_id.label}</p>
                    </div>
                </StationPageMapModal>

                <a
                    href={stationMetadata.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1"
                >
                    <IdentificationIcon className="size-4 fill-primary"></IdentificationIcon>
                    <StationTypeLabel
                        stationTypeLabel={stationMetadata.station_type.value}
                    ></StationTypeLabel>
                </a>
                <div className="flex items-center gap-1">
                    <MapPinIcon className="size-4 fill-primary"></MapPinIcon>
                    <p>
                        {stationMetadata.elevation} {Measurements.METER}
                    </p>
                </div>
            </div>
            <h3 className="mt-4 mb-2 text-md font-bold text-primary">
                {i18n.getFixedT(lang, "station")("information.subtitle")}
            </h3>
            <section className="flex flex-col gap-2">
                <div className="text-primary">
                    <h4 className="text-sm">
                        {i18n.getFixedT(lang, "station")("information.temperature")}
                    </h4>
                    <p>
                        <span className="font-bold">
                            {extremeTemperatureValues.maxValue} {Measurements.CELCIUS}
                        </span>{" "}
                        / {extremeTemperatureValues.minValue} {Measurements.CELCIUS}
                    </p>
                </div>
                <div className="text-primary">
                    <h4 className="text-sm">
                        {i18n.getFixedT(lang, "station")("information.meanTemp")}
                    </h4>
                    <p>
                        <span className="font-bold">
                            {extremeTemperatureValues.meanValue} {Measurements.CELCIUS}
                        </span>
                    </p>
                </div>
                <div className="text-primary">
                    <h4 className="text-sm">
                        {i18n.getFixedT(lang, "station")("information.rainyDaysTitle")}
                    </h4>
                    <p>
                        <span className="font-bold">{rainyDays}</span>
                    </p>
                </div>
                <div className="text-primary">
                    <h4 className="text-sm">
                        {i18n.getFixedT(lang, "station")("information.maxWind")}
                    </h4>
                    <p>
                        <span className="font-bold">
                            {extremeWindSpeedValues.maxValue} {Measurements.SPEED} ~{" "}
                            {calculateWindToBft(extremeWindSpeedValues.maxValue)} {Measurements.BFT}
                        </span>
                    </p>
                </div>
            </section>
        </section>
    );
}
