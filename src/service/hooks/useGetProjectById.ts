import { IGetProjectsResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetProjectById = ({
  project_id,
  enabled,
}: {
  project_id: string;
  enabled: boolean;
}) => {
  const { refetch, data, error, isPending } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetProjectsResponse>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/projects/", project_id],
      queryFn: () => ExpoApiService.getProjectById({ project_id }),
      enabled,
    });

  return {
    getProjectById: refetch,
    getProjectByIdData: data?.data,
    getProjectByIdError: error?.response?.data?.message,
    getProjectByIdPending: isPending,
  };
};
