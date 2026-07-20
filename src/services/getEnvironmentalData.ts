import "server-only";
import { cache } from "react";
import { DataService } from "@/services/DataService";
import type { EnvironmentalData } from "@/types";

const ENVIRONMENTAL_REVALIDATE_SECONDS = 900;

export const getEnvironmentalData = cache(
    async (clusterId: number): Promise<EnvironmentalData[]> =>
        new DataService().fetchEnvironmentalDataByStation(clusterId, {
            revalidate: ENVIRONMENTAL_REVALIDATE_SECONDS,
        })
);
