type LoadingForecastProps = {
    i18n: any;
};

type WeatherMessages = {
    [k:string]: string[]
};
export default function LoadingForecastData(props: Readonly<LoadingForecastProps>) {
    const selectedLanguage = props.i18n.language;

    const weatherMessages: WeatherMessages = {
        en: [
            "🌥️ Summoning the clouds…",
            "🌧️ Chasing raindrops across the model…",
            "☀️ Gathering sunshine packets…",
            "💨 Measuring the winds…",
            "🌩️ Catching lightning in the data…",
            "🌈 Assembling tomorrow’s sky…",
            "📡 Asking the atmosphere nicely for answers…",
            "🔮 Reading tea leaves… but with satellites.",
            "🛰️ Hacking into the weather matrix…"
        ],
        el: [
            "🌥️ Μαζεύουμε σύννεφα πάνω απ’ τον Σπερχειό…",
            "🌧️ Τσεκάρουμε αν βρέχει στην Όρθρυ ή μόνο στο μοντέλο…",
            "☀️ Ρυθμίζουμε τον ήλιο να βγει πρώτα στη Λαμία…",
            "💨 Μετράμε πόσα μποφόρ θα κατεβούν από τον Καλλίδρομο…",
            "🌩️ Πιάνουμε κεραυνούς πριν φτάσουν Γοργοπόταμο…",
            "🌈 Κάνουμε update τον ουρανό πάνω από τον Μαλιακό…",
            "📡 Σκανάρουμε σήμα μέχρι την Υπάτη…",
            "🔮 Ρωτάμε τα έλατα της Οίτης αν θα βρέξει…",
            "🛰️ Συνδεόμαστε με δορυφόρο για live εικόνα απ’ την πλατεία Πάρκου…"
        ],
    };

    const randomIndex = Math.floor(Math.random() * weatherMessages[selectedLanguage].length);
    return (
        <div className="my-4 flex h-[260px] w-full items-center justify-center">
            <h3 className="my-2 font-semibold text-primary">
                {weatherMessages[selectedLanguage][randomIndex]}
            </h3>
        </div>
    );
}