import {
  ICreateExhibitionBody,
  IUpdateExhibitionBody,
} from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePostCreateExhibition = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IUpdateExhibitionBody }>,
    AxiosError<{ message: string }>,
    { body: ICreateExhibitionBody }
  >({
    mutationFn: ExpoApiService.postCreateExhibition,
  });

  return {
    postCreateExhibition: mutate,
    postCreateExhibitionData: data?.data,
    postCreateExhibitionError: error?.response?.data?.message,
    postCreateExhibitionRest: isPending,
  };
};
