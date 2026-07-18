/* eslint-disable react/no-unknown-property */
import { ImageResponse } from "next/og";
import { getT } from "@/i18n";
import configuration from "@/app/appConfig";

export async function StationUnavailableShareableCard(lng: string) {
    const { t, i18n } = await getT("stationUnavailable");
    i18n.changeLanguage(lng);

    return new ImageResponse(
        <div
            style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#3D5361",
            }}
        >
            <div tw="flex flex-col items-center text-white text-center px-24">
                <h1 tw="text-5xl font-bold uppercase">{configuration.metadata.site_name}</h1>
                <p tw="text-3xl mt-6">{t("title")}</p>
            </div>
        </div>,
        {
            width: 1200,
            height: 630,
        }
    );
}
