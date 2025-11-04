import { IGetAllExhibitionsResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetExhibitions = ({ enabled }: { enabled?: boolean }) => {
  const { refetch, data, error, ...rest } = useQuery<
    AxiosResponse<IGetAllExhibitionsResponse[]>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["/exhibitions"],
    queryFn: () => ExpoApiService.getExhibitions(),
    enabled,
  });

  return {
    getExhibitions: refetch,
    getExhibitionsData: data?.data,
    getExhibitionsError: error?.response?.data?.message,
    getExhibitionsRest: rest,
  };
};
