import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useDeleteReview = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<boolean>,
    AxiosError<{ message: string }>,
    { review_id: string }
  >({
    mutationFn: ExpoApiService.deleteReview,
  });

  return {
    deleteReview: mutate,
    deleteReviewData: data?.data,
    deleteReviewError: error?.response?.data?.message,
    deleteReviewRest: isPending,
  };
};
