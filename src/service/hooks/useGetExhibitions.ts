import { IGetAllExhibitionsResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetExhibitions = ({
  enabled,
  name,
  start_date,
}: {
  enabled?: boolean;
  name?: string;
  start_date?: string;
}) => {
  const { refetch, data, error, ...rest } = useQuery<
    AxiosResponse<IGetAllExhibitionsResponse[]>,
    AxiosError<{ message: string }>
  >({
    queryKey: ["/feiras"],
    queryFn: () => ExpoApiService.getExhibitions({ name, start_date }),
    enabled,
  });

  return {
    getExhibitions: refetch,
    getExhibitionsData: data?.data,
    getExhibitionsError: error?.response?.data?.message,
    getExhibitionsRest: rest,
  };
};
