import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useDeleteProject = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<any>,
    AxiosError<{ message: string }>,
    { project_id: string }
  >({
    mutationFn: ExpoApiService.deleteProject,
  });

  return {
    deleteProject: mutate,
    deleteProjectData: data?.data,
    deleteProjectError: error?.response?.data?.message,
    deleteProjectRest: isPending,
  };
};
