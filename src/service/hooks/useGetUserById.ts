import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";
import { IGetUsersResponse } from "@/types/backendTypes";

export const useGetUserById = ({
  user_id,
  enabled,
}: {
  user_id: string;
  enabled: boolean;
}) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetUsersResponse>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/users/", user_id],
      queryFn: () => ExpoApiService.getUserById({ user_id }),
      enabled,
    });

  return {
    getUserById: refetch,
    getUserByIdData: data?.data,
    getUserByIdError: error?.response?.data?.message,
    getUserByIdPending: isPending || isLoading || isRefetching,
  };
};
