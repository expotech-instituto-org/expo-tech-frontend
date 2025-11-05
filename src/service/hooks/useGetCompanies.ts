import { IIdAndName } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetCompanies = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, ...rest } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IIdAndName[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/companies"],
      queryFn: () => ExpoApiService.getCompanies(),
      enabled,
    });

  return {
    getCompanies: refetch,
    getCompaniesData: data?.data,
    getCompaniesError: error?.response?.data?.message,
    getCompaniesRest: rest,
  };
};
