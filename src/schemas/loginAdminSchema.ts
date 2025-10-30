import z from "zod/v4";

export const loginAdminSchema = z.object({
  email: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(5, "Insira no mínimo 5 caracteres"),
  password: z
    .string({ error: "Campo obrigatório" })
    .trim()
    .min(5, "Insira no mínimo 5 caracteres"),
});

export type TLoginAdminSchema = z.infer<typeof loginAdminSchema>;
