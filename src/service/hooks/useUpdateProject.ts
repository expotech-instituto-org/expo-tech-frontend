import { ICreateProjectBody, IGetProjectsResponse } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePutUpdateProject = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetProjectsResponse }>,
    AxiosError<{ message: string }>,
    { body: ICreateProjectBody; project_id: string }
  >({
    mutationFn: (variables) => {
      return ExpoApiService.putUpdateProject(variables);
    },
  });

  return {
    putUpdateProject: mutate,
    putUpdateProjectData: data?.data,
    putUpdateProjectError: error?.response?.data?.message,
    putUpdateProjectRest: isPending,
  };
};
