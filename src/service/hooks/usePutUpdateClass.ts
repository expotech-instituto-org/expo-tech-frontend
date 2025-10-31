import { IGetClassesResponse, IUpsertClassBody } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePutUpdateClass = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetClassesResponse }>,
    AxiosError<{ message: string }>,
    { body: IUpsertClassBody; class_id: string }
  >({
    mutationFn: ExpoApiService.putUpdateClass,
  });

  return {
    putUpdateClass: mutate,
    putUpdateClassData: data?.data,
    putUpdateClassError: error?.response?.data?.message,
    putUpdateClassRest: isPending,
  };
};
