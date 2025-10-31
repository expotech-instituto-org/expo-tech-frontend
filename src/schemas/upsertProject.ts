import z from "zod/v4";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const upsertProjectSchema = z.object({
  name: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(3, "Insira no mínimo 3 caracteres"),
  company_name: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(3, "Insira no mínimo 3 caracteres"),
  description: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(1, "Insira no mínimo 1 caracter no campo descrição"),
  participants: z
    .array(z.string({ error: "Campo obrigatório" }))
    .min(3, "Selecione no mínimo 3 participantes."),
  coordinates: z.string({ error: "Campo obrigatório" }).min(1),
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

export type TUpsertProjectSchema = z.infer<typeof upsertProjectSchema>;
