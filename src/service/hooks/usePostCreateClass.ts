import { IUpsertClassBody, IGetClassesResponse } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePostCreateClass = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetClassesResponse }>,
    AxiosError<{ message: string }>,
    { body: IUpsertClassBody }
  >({
    mutationFn: ExpoApiService.postCreateClass,
  });

  return {
    postCreateClass: mutate,
    postCreateClassData: data?.data,
    postCreateClassError: error?.response?.data?.message,
    postCreateClassRest: isPending,
  };
};
