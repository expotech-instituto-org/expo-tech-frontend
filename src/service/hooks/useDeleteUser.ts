import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useDeleteUser = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: any }>,
    AxiosError<{ message: string }>,
    { user_id: string }
  >({
    mutationFn: ExpoApiService.deleteUser,
  });

  return {
    deleteUser: mutate,
    deleteUserData: data?.data,
    deleteUserError: error?.response?.data?.message,
    deleteUserRest: isPending,
  };
};
