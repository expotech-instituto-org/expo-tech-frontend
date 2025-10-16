import z from "zod/v4";

export const loginSchema = z
  .object({
    email: z
      .string({ error: "Campo obrigatório" })
      .trim()
      .min(5, "Insira no mínimo 5 caracteres"),
    password: z
      .string({ error: "Campo obrigatório" })
      .trim()
      .min(5, "Insira no mínimo 5 caracteres"),
  })
  .and(
    z.discriminatedUnion("isLogin", [
      z.object({ isLogin: z.literal(true) }),
      z.object({
        isLogin: z.literal(false),
        passwordConfirmation: z
          .string({ error: "Campo obrigatório" })
          .trim()
          .min(5, "Insira no mínimo 5 caracteres"),
      }),
    ])
  )
  .and(
    z.discriminatedUnion("step", [
      z.object({ step: z.literal(true) }),
      z.object({
        step: z.literal(false),
        age: z
          .string({ error: "Campo obrigatório" })
          .min(3, "Insira no mínimo 3 caracteres"),
        knowledge: z.number({ error: "Campo obrigatório" }),
        profile: z.number({ error: "Campo obrigatório" }),
        company: z.number().optional(),
        class: z.number().optional(),
      }),
    ])
  )
  .superRefine((data, ctx) => {
    if (!data.isLogin) {
      if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          code: "custom",
          message: "As senhas não coincidem",
          path: ["passwordConfirmation"],
          params: { errorCode: "password_mismatch" },
        });
      }
    }
  });

export type TLoginSchema = z.infer<typeof loginSchema>;
