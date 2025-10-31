import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useDeleteClass = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<any>,
    AxiosError<{ message: string }>,
    { class_id: string }
  >({
    mutationFn: ExpoApiService.deleteClass,
  });

  return {
    deleteClass: mutate,
    deleteClassData: data?.data,
    deleteClassError: error?.response?.data?.message,
    deleteClassRest: isPending,
  };
};
