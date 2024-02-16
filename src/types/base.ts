import { z } from "zod";

export const DefaultResponseSchema = z
  .object({
    response: z.string(),
    responsetext: z.string(),
    response_code: z.string(),
  })
  .passthrough();
