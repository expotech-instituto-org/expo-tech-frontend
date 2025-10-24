import z from "zod/v4";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const upsertExhibitionsSchema = z.object({
  name: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(3, "Insira no mínimo 3 caracteres"),
  description: z.string().optional(),
  participants: z
    .array(z.string({ error: "Campo obrigatório" }))
    .min(3, "Selecione no mínimo 3 participantes."),
  images: z
    .array(
      z
        .file()
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          "Only .jpg, .png, .webp and .jpeg formats are supported."
        )
    )
    .min(1, "Selecione no mínimo 1 arquivo.")
    .max(5, "Selecione no máximo 5 arquivos."),
});

export type TUpsertExhibitionsSchema = z.infer<typeof upsertExhibitionsSchema>;
