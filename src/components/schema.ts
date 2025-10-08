import z4, { z } from "zod/v4";
import { IQuestion } from "./SwipeableDrawer";

type DynamicSchemaType = z.ZodObject<Record<string, z.ZodTypeAny>>;

const createSchemaFromQuestions = (
  questions: IQuestion[]
): DynamicSchemaType => {
  const schemaFields: Record<string, z4.ZodTypeAny> = {};

  questions.forEach((q, idx) => {
    let fieldSchema: z4.ZodTypeAny;

    if (q.responseType === "Rating") {
      fieldSchema = z.number().int().max(5);
    } else if (q.responseType === "Comment") {
      q.isRequired
        ? (fieldSchema = z.string().trim().min(1))
        : (fieldSchema = z.string().trim().optional());
    } else {
      return;
    }

    if (q.responseType === "Rating" && q.isRequired) {
      fieldSchema = fieldSchema.refine(
        (val) => val !== undefined,
        "A avaliação é obrigatória."
      );
    }

    schemaFields[q.description] = fieldSchema;
  });

  return z.object(schemaFields).strict();
};

export { createSchemaFromQuestions };
