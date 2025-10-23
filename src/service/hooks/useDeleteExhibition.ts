import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useDeleteExhibition = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<any>,
    AxiosError<{ message: string }>,
    { exhibition_id: string }
  >({
    mutationFn: ExpoApiService.deleteExhibition,
  });

  return {
    deleteExhibition: mutate,
    deleteExhibitionData: data?.data,
    deleteExhibitionError: error?.response?.data?.message,
    deleteExhibitionRest: isPending,
  };
};
