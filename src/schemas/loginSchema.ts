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
    step: z.number(),
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
      z.object({ step: z.literal(1) }),
      z.object({
        step: z.literal(2),
        age: z.coerce.number().refine((val) => val >= 2, {
          message: "Insira no mínimo 2 caracteres",
        }),
        knowledge: z.string().trim().min(2, "Insira no mínimo 2 caracteres"),
        profile: z.string().trim().min(2, "Insira no mínimo 2 caracteres"),
        company: z.string().optional(),
        class: z.string().optional(),
      }),
    ])
  )
  .superRefine((data, ctx) => {
    if (!data.isLogin && data.step === 1) {
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
