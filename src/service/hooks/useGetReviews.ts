import { IGetReviewsResponse, IGetUsersResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetReviews = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetReviewsResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/reviews"],
      queryFn: () => ExpoApiService.getReviews(),
      enabled,
    });

  return {
    getReviews: refetch,
    getReviewsData: data?.data,
    getReviewsError: error?.response?.data?.message,
    getReviewsPending: isPending || isLoading || isRefetching,
  };
};
