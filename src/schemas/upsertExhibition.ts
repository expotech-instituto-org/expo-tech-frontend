import { DateTime } from "luxon";
import z from "zod/v4";

export const upsertExhibitionSchema = z.object({
  name: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(3, "Insira no mínimo 3 caracteres"),
  description: z.string().optional(),
  start_date: z.custom<DateTime<boolean>>(
    (val): val is DateTime<boolean> => val instanceof DateTime
  ),
  end_date: z.custom<DateTime<boolean>>(
    (val): val is DateTime<boolean> => val instanceof DateTime
  ),
  criteria: z
    .array(
      z.object({
        name: z
          .string({ error: "Campo obrigatório" })
          .min(1, "Campo obrigatório"),
        weight: z
          .string({ error: "Campo obrigatório" })
          .min(0.1, "O peso deve ser no mínimo 0.1"),
      })
    )
    .optional(),
  image: z.file().min(1, "Selecione no mínimo 1 arquivo."),
});

export type TUpsertExhibitionSchema = z.infer<typeof upsertExhibitionSchema>;
