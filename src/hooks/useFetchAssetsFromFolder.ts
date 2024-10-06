"use client";
import { useEffect, useState } from "react";
import { DataService } from "@/services/DataService";
import { Assets } from "@/types";

export const useAssetsFromFolder = (folderId: string) => {
    const dataService = new DataService();
    const [assets, setAssets] = useState<Assets[]>([]);

    const fetchForecastAssetsList = async () => {
        await dataService
            .fetchAssetsFromFolder(folderId)
            .then((response) => {
                setAssets(response);
            })
            .catch((error) => {
                console.log(error);
                setAssets([]);
            });
    };

    useEffect(() => {
        fetchForecastAssetsList();
    }, []);

    return assets;
};