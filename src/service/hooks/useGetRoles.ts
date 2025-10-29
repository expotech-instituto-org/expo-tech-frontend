import { IGetRolesResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetRoles = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetRolesResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/roles"],
      queryFn: () => ExpoApiService.getRoles(),
      enabled,
    });

  return {
    getRoles: refetch,
    getRolesData: data?.data,
    getRolesError: error?.response?.data?.message,
    getRolesPending: isPending,
  };
};
