import { z } from "zod";

export const Configuration = z.object({
    id: z.number().min(1),
    value: z.string().min(1),
    config: z.record(z.any()),
});


export const ConfigurationSchema = z.array(Configuration);