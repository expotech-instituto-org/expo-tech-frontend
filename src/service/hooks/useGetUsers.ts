import { IGetUsersResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../ExpoApiService";

export const useGetUsers = () => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<{ response: IGetUsersResponse[] }>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/users"],
      queryFn: () => ExpoApiService.getUsers(),
    });

  return {
    getUsers: refetch,
    getUsersData: data?.data,
    getUsersError: error?.response?.data?.message,
    getUsersPending: isPending || isLoading || isRefetching,
  };
};
