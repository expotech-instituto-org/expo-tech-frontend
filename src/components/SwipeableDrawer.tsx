import { createSchemaFromQuestions } from "@/schemasDebusg";
import { IQuestion, TResponseType } from "@/types/question";
import { zodResolver } from "@hookform/resolvers/zod";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  Rating,
  Skeleton,
  SwipeableDrawer,
  TextareaAutosize,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";



interface IDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  question: IQuestion[];
  title: string;
  subtitle: string;
}

export type TFormValues = {
  [key: string]: number | string | undefined;
};

export function SwipeableDrawerComponent({
  open,
  setOpen,
  question,
  title,
  subtitle,
}: IDrawerProps) {
  const dynamicSchema = createSchemaFromQuestions(question);

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
    console.log("Dados do Formulário Validados:", data);
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        swipeAreaWidth={56}
        disableSwipeToOpen={false}
        keepMounted
      >
        <div className=" flex flex-col gap-[1.2rem] px-[3rem]  top-[-56] rounded-t-[8] visible right-0 left-0 bg-[var(--background)] ">
          <div
            className="w-[30rem] h-[6rem] bg-grey rounded-[3rem] absolute top-[8]
          left-[(calc(50%) - 15px)]"
          ></div>
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-9"
          >
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
                      <div className="flex items-center space-x-2">
                        <Rating
                          className="!text-4xl"
                          name={q.description}
                          value={Number(field.value) || 0}
                          onChange={(event, newValue) => {
                            field.onChange(newValue || 0);
                          }}
                          precision={1}
                        />
                      </div>
                    )}
                  />
                )}

                {q.responseType === "Comment" && (
                  <TextareaAutosize
                    className="!w-full border-1 border-[var(--azul-primario)] border-solid p-2"
                    id={q.description}
                    {...register(q.description)}
                    aria-label="minimum height"
                    minRows={10}
                    style={{ width: 200 }}
                  />
                )}

                {/* Exibição de Erros */}
                {errors[idx] && (
                  <p className="text-sm text-red-600">
                    {errors[idx]?.message as string}
                  </p>
                )}
              </div>
            ))}
          </form>
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
              onClick={handleSubmit(onSubmit)}
            >
              Enviar
            </Button>
          </div>
        </div>
        <div className="absoulute top-[-56] rounded-t-[8] visible right-0 left-0 bg-white px-[2] pb-[2] h-full overflow-auto">
          <Skeleton variant="rectangular" height="100%" />
        </div>
      </SwipeableDrawer>
    </>
  );
}
