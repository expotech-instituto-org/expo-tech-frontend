import { IGetUsersResponse } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePutUser = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetUsersResponse }>,
    AxiosError<{ message: string }>,
    { body: IGetUsersResponse; user_id: string }
  >({
    mutationFn: ExpoApiService.putUser,
  });

  return {
    putUser: mutate,
    putUserData: data?.data,
    putUserError: error?.response?.data?.message,
    putUserRest: isPending,
  };
};
