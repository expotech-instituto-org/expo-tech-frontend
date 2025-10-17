import { IGetReadUsersMe } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetReadUsersMe = () => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<{ response: IGetReadUsersMe }>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/users/me"],
      queryFn: () => ExpoApiService.getReadUsersMe(),
    });

  return {
    getReadUsersMe: refetch,
    getReadUsersMeData: data?.data,
    getReadUsersMeError: error?.response?.data?.message,
    getReadUsersMePending: isPending || isLoading || isRefetching,
  };
};
