import { IGetProjectsParams, IGetProjectsResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetProjects = ({
  enabled,
  company_name,
  exhibition_id,
  project_name,
}: { enabled?: boolean } & IGetProjectsParams) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetProjectsResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/projects"],
      queryFn: () =>
        ExpoApiService.getProjects({
          company_name,
          exhibition_id,
          project_name,
        }),
      enabled,
    });

  return {
    getProjects: refetch,
    getProjectsData: data?.data,
    getProjectsError: error?.response?.data?.message,
    getProjectsPending: isPending || isLoading || isRefetching,
  };
};
