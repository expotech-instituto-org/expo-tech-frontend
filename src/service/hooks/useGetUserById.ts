import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetUserById = ({ user_id }: { user_id: string }) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<{ response: any }>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/usersById"],
      queryFn: () => ExpoApiService.getUserById({ user_id }),
    });

  return {
    getUserById: refetch,
    getUserByIdData: data?.data,
    getUserByIdError: error?.response?.data?.message,
    getUserByIdPending: isPending || isLoading || isRefetching,
  };
};
