import { IGetReviewsByProjectResponse } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetReviewsByProject = ({
  project_id,
  enabled,
}: {
  project_id: string;
  enabled: boolean;
}) => {
  const { refetch, data, error, isPending, isLoading, isRefetching } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IGetReviewsByProjectResponse[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/reviews/project/", project_id],
      queryFn: () => ExpoApiService.getReviewsByProject({ project_id }),
      enabled,
    });

  return {
    getReviewsByProject: refetch,
    getReviewsByProjectData: data?.data,
    getReviewsByProjectError: error?.response?.data?.message,
    getReviewsByProjectPending: isPending || isLoading || isRefetching,
  };
};
