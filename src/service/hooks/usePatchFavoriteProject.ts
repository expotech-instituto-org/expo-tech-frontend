import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePatchFavoriteProject = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: boolean }>,
    AxiosError<{ message: string }>,
    { project_id: string }
  >({
    mutationFn: ExpoApiService.patchFavoriteProject,
  });

  return {
    patchFavoriteProject: mutate,
    patchFavoriteProjectData: data,
    patchFavoriteProjectError: error?.response?.data?.message,
    patchFavoriteProjectRest: isPending,
  };
};
