export async function generateMetadata() {
    
    return {
        title: "myWEATHR.com - About the application",
        description: "Weather application created by Next.js and Tailwind CSS.",
        keywords: "weather application, weather app, weather, weather forecast, weather data, weather conditions, weather map, weather stations, weather warnings, weather alerts, weather information, weather updates, weather news, weather reports, weather service, weather website, weather application, weather app, weather, weather forecast, weather data, weather conditions, weather map, weather stations, weather warnings, weather alerts, weather information, weather updates, weather news, weather reports, weather service, weather website, nextjs, nodejs, react, Lamia, Fthiotida, Central Greece, Greece, weather in Lamia, weather in Fthiotida, weather in Central Greece, Karpenisi, weather in Karpenisi, kairos tora, kairos Lamia, καιρός Λαμία, καιρός τώρα, καιρός Φθιώτιδα, καιρός Καρπενήσι, καιρός Κεντρική Ελλάδα, καιρός Ελλάδα, καιρός Κεντρική Ελλάδα, καιρός Φθιώτιδα, καιρός Λαμίας, καιρός Φθιώτιδας",
    };
}

export default function Stations() {
    return (
        <main className="relative flex flex-1 flex-col">
            <div className="mx-4 mt-4 md:container md:mx-auto">
                <div className="flex flex-1 flex-col items-center justify-center text-primary">
                    <h2 className="mb-4 text-2xl text-primary">About Us</h2>
                    <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-2/3">
                        <p className="mb-2 text-left">
                        MyWeathr is more than just a weather app—it’s a passion project born from our love for our hometown, <a href="https://lamia.gr/" target="_blank" className="font-bold text-success" rel="noreferrer">Lamia</a> and the <a className="font-bold text-success" href="https://pste.gov.gr/" target="_blank" rel="noreferrer">Fthiotida region</a>. Created by a small team of developers and weather enthusiasts, and backed by a local group of amateur meteorologists, our mission is to provide <span className="font-bold">accurate and real-time weather information</span> for Central Greece, with a special focus on the place we call home.<br/>  
                        What started as a small idea has grown into a platform that serves <span className="font-bold">our city and beyond</span>, and we couldn’t be more proud to share it with you.  
                        </p>
                        <p className="mb-2 text-left">
                        We provide <span className="font-bold">live weather data, 3-day forecasts per station,</span> and <span className="font-bold">weather warnings for major incidents,</span> helping locals stay informed and prepared.
                        </p>
                        <p className="mb-2 text-left">
                        MyWeathr is a web weather application built with <span className="font-bold">Next.js and Tailwind CSS,</span> powered by <span className="font-bold">Directus & Node.js.</span> It aggregates weather data from various sources to offer reliable insights tailored to the region.
                        </p>
                    </div>
                    <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-2/3">
                        <h4 className="text-lg font-semibold">Weather Sources for Station Data</h4>
                        <p className="mb-2 mt-4">
                        MyWeathr collects real-time data from weather stations across Central Greece and Thessaly. The weather data is refreshed every 
                            <span className="font-bold"> 30 minutes</span>, but accuracy may vary depending on the data source. The collected data includes 
                            <span className="italic">temperature, humidity, wind speed, wind direction, precipitation, barometric pressure, rain rate, and calculated weather conditions</span>.
                        </p>
                        <p className="mb-2">Our platform relies on a diverse range of sources to provide accurate weather insights. Without the support of the following networks, MyWeathr would not be possible:
                        </p>
                        <ul className="mt-2 flex flex-col gap-2 pl-4">
                            <li>
                                <a href="https://www.noa.gr/" className="text-success" target="_blank" rel="noreferrer">National Observatory of Athens</a>
                            </li>
                            <li>
                                <a href="https://www.weathercloud.net/" className="text-success" target="_blank" rel="noreferrer">Weather Cloud</a>
                            </li>
                            <li>
                                <a href="https://www.wunderground.com/" className="text-success" target="_blank" rel="noreferrer">Weather Underground</a>
                            </li>
                            <li>
                                <a href="https://www.euweather.eu/" className="text-success" target="_blank" rel="noreferrer">EUWeather</a>
                            </li>
                            <li>
                                <a href="https://meteoiot.com/" className="text-success" target="_blank" rel="noreferrer">MeteoIoT</a>
                            </li>
                        </ul>
                        <p className="mt-2">
                            Additionally, MyWeathr integrates data from private weather stations that are not affiliated with any network. 
                            We extend our sincere gratitude to the owners of these stations and networks for their contributions in making this platform possible.
                        </p>
                    </div>
                    <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-2/3">
                        <h4 className="text-lg font-semibold">Forecasts & Warnings</h4>
                        <p className="mb-2 mt-4">
                        MyWeathr uses different models for the weather forecast. For the stations forecast, it uses the <a href="https://www.dwd.de/EN/ourservices/nwp_forecast_data/nwp_forecast_data.html" target="_blank" rel="noreferrer" className="text-success">ICON-EU
                            </a> 7km model, provided by <a href="https://www.dwd.de/EN/Home/home_node.html" target="_blank" rel="noreferrer" className="text-success">DwD</a> meteorological agency.
                        </p>
                        <p className="mb-2">
                            The forecast is updated once per day at 13:00 UTC+02:00 and it provides <span className="font-semibold">hourly</span> weather information regarding temperature, wind direction, wind speed, precipitation & weather conditions.
                        </p>
                        <p className="mb-2">
                            The wind layer overlay of the map and the temperature baselayer are using the <a href="https://nomads.ncep.noaa.gov/" target="_blank" className="text-success" rel="noreferrer">GFS</a> 0.25 model, provided by <a href="https://www.noaa.gov/" target="_blank" className="text-success" rel="noreferrer">NOAA</a> meteorological agency. They are both updated daily at 07:30 UTC+02:00.
                        </p>
                        <p className="mb-2">
                            The weather warnings are provided by the <a href="https://www.meteoalarm.eu/" target="_blank" className="text-success" rel="noreferrer">MeteoAlarm</a> network and are updated <span className="font-semibold">hourly</span>. The full list of supported hazards can be found on their website.
                        </p>
                    </div>
                    <div className="my-2 w-full rounded-xl bg-white p-4 drop-shadow-md lg:w-2/3">
                        <h4 className="text-lg font-semibold">Special shouts</h4>
                        <ul className="mt-4 flex flex-col gap-2 pl-4">
                            <li>
                                <a href="https://fthiotida-meteogroup.gr/" className="text-success" target="_blank" rel="noreferrer">Fthiotida Meteogroup</a> - without your continuous help and feedback we could not have made it.
                            </li>
                            <li>
                                <a href="https://euacosmos.com" className="text-success" target="_blank" rel="noreferrer">Argyros Argyridis</a> - without your GIS expertise the temperature layer would not have been possible.
                            </li>
                            <li>
                                <a href="http://www.meteoclub.gr/" className="text-success" target="_blank" rel="noreferrer">Meteoclub</a> - for getting us started in the world of meteorology.
                            </li>
                            <li>
                                Family & Friends - for the support and understanding.
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </main>
    );
}
