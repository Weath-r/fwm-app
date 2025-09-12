type NoForecastSectionProps = {
    i18n: any;
};

export default function NoForecastSection(props: Readonly<NoForecastSectionProps>) {
    const selectedLanguage = props.i18n.language;

    return (
        <div className="my-4 flex h-[260px] w-full items-center justify-center">
            <h3 className="my-2 font-semibold text-primary">
                {props.i18n.getFixedT(selectedLanguage, "forecasts")("FthiotidaForecasts.noForecastData")}
            </h3>
        </div>
    );
}