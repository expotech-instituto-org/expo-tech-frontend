import { IGetUsersResponse, IUpdateUserBody } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePutUpdateUser = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetUsersResponse }>,
    AxiosError<{ message: string }>,
    { body: IUpdateUserBody; user_id: string }
  >({
    mutationFn: ExpoApiService.putUpdateUser,
  });

  return {
    putUpdateUser: mutate,
    putUpdateUserData: data?.data,
    putUpdateUserError: error?.response?.data?.message,
    putUpdateUserRest: isPending,
  };
};
