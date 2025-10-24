import { IUpdateExhibitionBody } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePutUpdateExhibition = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IUpdateExhibitionBody }>,
    AxiosError<{ message: string }>,
    { body: IUpdateExhibitionBody; exhibition_id: string }
  >({
    mutationFn: ExpoApiService.putUpdateExhibition,
  });

  return {
    putUpdateExhibition: mutate,
    putUpdateExhibitionData: data?.data,
    putUpdateExhibitionError: error?.response?.data?.message,
    putUpdateExhibitionRest: isPending,
  };
};
