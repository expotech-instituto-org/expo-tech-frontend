import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";
import { ILoginBody } from "@/types/backendTypes";

export const useLogin = () => {
  const { mutate, data, error, isPending } = useMutation<
    AxiosResponse<{ response: any }>,
    AxiosError<{ message: string }>,
    { body: ILoginBody }
  >({
    mutationFn: ExpoApiService.login,
  });

  return {
    login: mutate,
    loginData: data?.data,
    loginError: error?.response?.data?.message,
    loginRest: isPending,
  };
};
