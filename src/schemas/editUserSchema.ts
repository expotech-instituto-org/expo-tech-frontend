import z from "zod/v4";

export const editUserSchema = z.object({
  email: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(5, "Insira no mínimo 5 caracteres"),
  password: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(5, "Insira no mínimo 5 caracteres"),
  role: z.number().min(1),
  age: z.number().min(1),
  class: z.number().min(1),
});

export type TEditUserSchema = z.infer<typeof editUserSchema>;
