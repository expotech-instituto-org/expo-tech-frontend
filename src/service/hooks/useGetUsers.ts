import { IGetUsersResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetUsers = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetUsersResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/users"],
      queryFn: () => ExpoApiService.getUsers(),
      enabled,
    });

  return {
    getUsers: refetch,
    getUsersData: data?.data,
    getUsersError: error?.response?.data?.message,
    getUsersPending: isPending,
  };
};
