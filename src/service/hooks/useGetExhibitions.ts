import { IGetAllExhibitionsResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetExhibitions = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
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
    getExhibitionsPending: isPending,
  };
};
