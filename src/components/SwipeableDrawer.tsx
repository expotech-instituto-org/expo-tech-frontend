"use client";
import { createSchemaFromQuestions } from "@/schemas";
import { usePostCreateReview } from "@/service/hooks/usePostCreateReview";
import { IQuestion } from "@/types/question";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Rating,
  SwipeableDrawer,
  TextareaAutosize,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface IDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  question: IQuestion[];
  title: string;
  subtitle: string;
  exhibitionId: string;
}

export type TFormValues = {
  [key: string]: number | string | undefined;
};

interface IGrade {
  name: string;
  score: number;
}

export function SwipeableDrawerComponent({
  open,
  setOpen,
  question,
  title,
  subtitle,
                                         }: IDrawerProps) {
  const { project_id } = useParams();
  const dynamicSchema = createSchemaFromQuestions(question);
  const [grades, setGrades] = useState<IGrade[]>([]);
  const [comment, setComment] = useState<string>("");

  const { postCreateReview, postCreateReviewData, postCreateReviewError } =
    usePostCreateReview();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TFormValues>({
    resolver: zodResolver(dynamicSchema) as any,
    defaultValues: {},
  });

  const onSubmit = (data: TFormValues) => {
    const newGrades: IGrade[] = [];
    let newComment = "";

    question.forEach((item) => {
      if (item.responseType === "Comment") {
        newComment = String(data[item.description] || "");
      } else {
        newGrades.push({
          name: item.description,
          score: Number(data[item.description]) || 0,
        });
      }
    });

    setGrades(newGrades);
    setComment(newComment);
  };
useEffect(() => {
  if (grades.length === 0 && !comment) return;

  postCreateReview({
    body: {
      comment,
      exhibition_id: "b2e2f820-f59b-42f5-a9f4-51fab8585577",
      project_id: project_id!.toString(),
      grades,
    },
  });
}, [grades, comment]);


  useEffect(() => {
    if (postCreateReviewData) {
      toast.success("Avaliação enviada com sucesso!");
      setOpen(false);
    }

    if (postCreateReviewError) {
      toast.error("Erro ao enviar avaliação.");
    }
  }, [postCreateReviewData, postCreateReviewError]);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      swipeAreaWidth={56}
      disableSwipeToOpen={false}
      keepMounted
    >
      <div className="flex flex-col gap-[1.2rem] px-[3rem] rounded-t-[8] bg-[var(--background)]">
        <div className="flex flex-col gap-[.2rem]">
          <Button
            onClick={() => setOpen(false)}
            variant="text"
            className="!bg-transparent"
          >
            <h1 className="text-[var(--azul-primario)] font-bold text-[24px] text-center !capitalize">
              {title} <KeyboardArrowDownIcon className="!text-[24px]" />
            </h1>
          </Button>
          <h2 className="text-[1rem] text-center">{subtitle}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-9">
          {question.map((q, idx) => (
            <div key={idx} className="space-y-2">
              <label
                htmlFor={q.description}
                className="block text-sm font-medium text-gray-700 text-[20px]"
              >
                {q.description}
                {q.isRequired && <span className="text-red-500"> *</span>}
              </label>

              {q.responseType === "Rating" && (
                <Controller
                  name={q.description}
                  control={control}
                  render={({ field }) => (
                    <Rating
                      className="!text-4xl"
                      name={q.description}
                      value={Number(field.value) || 0}
                      onChange={(event, newValue) => {
                        field.onChange(newValue || 0);
                      }}
                      precision={1}
                    />
                  )}
                />
              )}

              {q.responseType === "Comment" && (
                <TextareaAutosize
                  className="!w-full border-1 border-[var(--azul-primario)] border-solid p-2"
                  id={q.description}
                  {...register(q.description)}
                  minRows={7}
                  style={{ width: "100%" }}
                />
              )}

              {errors[q.description] && (
                <p className="text-sm text-red-600">
                  {errors[q.description]?.message as string}
                </p>
              )}
            </div>
          ))}

          <div className="w-full flex flex-row justify-end gap-[1rem] !pb-[2rem]">
            <Button
              variant="outlined"
              className="!border-[var(--azul-primario)] !text-[var(--azul-primario)]"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="!bg-[var(--azul-primario)]"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </SwipeableDrawer>
  );
}
