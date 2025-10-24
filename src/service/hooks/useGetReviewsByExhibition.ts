import { IGetReviewsResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetReviewsByExhibition = ({
  exhibition_id,
  enabled,
}: {
  exhibition_id: string;
  enabled: boolean;
}) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetReviewsResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/reviews/exhibition/", exhibition_id],
      queryFn: () => ExpoApiService.getReviewsByExhibition({ exhibition_id }),
      enabled,
    });

  return {
    getReviewsByExhibition: refetch,
    getReviewsByExhibitionData: data?.data,
    getReviewsByExhibitionError: error?.response?.data?.message,
    getReviewsByExhibitionPending: isPending || isLoading || isRefetching,
  };
};
