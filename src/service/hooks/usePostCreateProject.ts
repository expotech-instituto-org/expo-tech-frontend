import { ICreateProjectBody, IGetProjectsResponse } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePostCreateProject = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetProjectsResponse }>,
    AxiosError<{ message: string }>,
    { body: ICreateProjectBody }
  >({
    mutationFn: ExpoApiService.postCreateProject,
  });

  return {
    postCreateProject: mutate,
    postCreateProjectData: data?.data,
    postCreateProjectError: error?.response?.data?.message,
    postCreateProjectRest: isPending,
  };
};
