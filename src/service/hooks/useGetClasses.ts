import { IGetClassesResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetClasses = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetClassesResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/classes"],
      queryFn: () => ExpoApiService.getClasses(),
      enabled,
    });

  return {
    getClasses: refetch,
    getClassesData: data?.data,
    getClassesError: error?.response?.data?.message,
    getClassesPending: isPending || isLoading || isRefetching,
  };
};
