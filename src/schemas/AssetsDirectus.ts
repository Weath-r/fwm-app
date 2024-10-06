import { z } from "zod";

export const AssetSchema = z.object({
    id: z.string().min(1),
    filename_download: z.string().min(1),
    title: z.string().min(1),
});


export const AssetsSchema = z.array(AssetSchema);