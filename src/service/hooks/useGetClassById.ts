import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";
import { IGetClassesResponse } from "@/types/backendTypes";

export const useGetClassById = ({
  class_id,
  enabled,
}: {
  class_id: string;
  enabled: boolean;
}) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetClassesResponse>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/classes/", class_id],
      queryFn: () => ExpoApiService.getClassById({ class_id }),
      enabled,
    });

  return {
    getClassById: refetch,
    getClassByIdData: data?.data,
    getClassByIdError: error?.response?.data?.message,
    getClassByIdPending: isPending || isLoading || isRefetching,
  };
};
