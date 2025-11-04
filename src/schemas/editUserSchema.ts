import { z } from "zod/v4";

const defaultSchema = z.object({
  email: z.string().trim().min(5, "Insira no mínimo 5 caracteres"),
  name: z.string().trim().min(3, "Insira no mínimo 3 caracteres"),
  password: z.string().trim().min(5, "Insira no mínimo 5 caracteres"),
});

const ageAndClassSchema = z.object({
  age: z.string().min(1),
  class: z.string().min(1),
});

const companyAndAgeSchema = z.object({
  company: z.string().min(1),
  age: z.string().min(1),
});

export const editUserSchema = z.discriminatedUnion("role", [
  // aluno e expositor
  defaultSchema
    .merge(ageAndClassSchema)
    .merge(z.object({ role: z.literal("aluno") })),
  defaultSchema
    .merge(ageAndClassSchema)
    .merge(z.object({ role: z.literal("expositor") })),
  defaultSchema
    .merge(ageAndClassSchema)
    .merge(z.object({ role: z.literal("guest") })),

  // cliente e colaborador
  defaultSchema.merge(companyAndAgeSchema).merge(
    z.object({
      role: z.literal("cliente"),
    })
  ),
  defaultSchema.merge(companyAndAgeSchema).merge(
    z.object({
      role: z.literal("colaborador"),
    })
  ),

  // admin e professores
  defaultSchema.merge(
    z.object({
      role: z.union([
        z.literal("admin"),
        z.literal("professor_tech"),
        z.literal("professor_base"),
        z.literal(""),
      ]),
    })
  ),
]);

export type TEditUserSchema = z.infer<typeof editUserSchema>;
