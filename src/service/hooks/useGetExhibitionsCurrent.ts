import { IGetExhibitionCurrentResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetExhibitionCurrent = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending } = useQuery<
    AxiosResponse<IGetExhibitionCurrentResponse>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["/feiras/current"],
    queryFn: () => ExpoApiService.getExhibitionsCurrent(),
    enabled,
  });

  return {
    getExhibitionCurrent: refetch,
    getExhibitionCurrentData: data?.data,
    getExhibitionCurrentError: error?.response?.data?.message,
    getExhibitionCurrentPending: isPending,
  };
};
