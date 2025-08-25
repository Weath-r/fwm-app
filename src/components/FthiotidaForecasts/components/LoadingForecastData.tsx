export default function LoadingForecastData() {
    const weatherMessages = [
        "🌥️ Summoning the clouds…",
        "🌧️ Chasing raindrops across the model…",
        "☀️ Gathering sunshine packets…",
        "💨 Measuring the winds…",
        "🌩️ Catching lightning in the data…",
        "🌈 Assembling tomorrow’s sky…",
        "📡 Asking the atmosphere nicely for answers…",
        "🔮 Reading tea leaves… but with satellites.",
        "🛰️ Hacking into the weather matrix…"
    ];
    const randomIndex = Math.floor(Math.random() * weatherMessages.length);
    return (
        <div className="my-4 flex w-full justify-center">
            <h3 className="my-2 font-semibold text-primary">
                {weatherMessages[randomIndex]}
            </h3>
        </div>
    );
}