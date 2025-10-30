import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ExpoApiService } from "../expoApiService";
import { IProject } from "@/types/backendTypes";

interface GetProjectsParams {
  exhibition_id?: string;
  project_name?: string;
  company_name?: string;
}

export const useGetProjects = (params?: GetProjectsParams) => {
  const query = useQuery<IProject[], AxiosError<{ message: string }>>({
    queryKey: ["getProjects", params],
    queryFn: async () => {
      const response = await ExpoApiService.getProjects(params);
      return response.data;
    },
    enabled: true
  });

  return {
    projects: query.data,
    projectsError: query.error?.response?.data?.message,
    projectsLoading: query.isLoading,
  };
};
