import { ICreateUserBody, IGetUsersResponse } from "@/types/backendTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const usePostCreateUser = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: IGetUsersResponse }>,
    AxiosError<{ message: string }>,
    { body: ICreateUserBody }
  >({
    mutationFn: ExpoApiService.postCreateUser,
  });

  return {
    postCreateUser: mutate,
    postCreateUserData: data?.data,
    postCreateUserError: error?.response?.data?.message,
    postCreateUserRest: isPending,
  };
};
