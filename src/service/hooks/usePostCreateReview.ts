import { ICreateReviewBody, IGetReviewsResponse } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePostCreateReview = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetReviewsResponse }>,
    AxiosError<{ message: string }>,
    { body: ICreateReviewBody }
  >({
    mutationFn: ExpoApiService.postCreateReview,
  });

  return {
    postCreateReview: mutate,
    postCreateReviewData: data?.data,
    postCreateReviewError: error?.response?.data?.message,
    postCreateReviewRest: isPending,
  };
};
