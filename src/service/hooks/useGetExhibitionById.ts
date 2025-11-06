import { IUpdateExhibitionBody } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetExhibitionById = ({
  exhibition_id,
  enabled,
}: {
  exhibition_id: string;
  enabled: boolean;
}) => {
  const { refetch, data, error, ...rest } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IUpdateExhibitionBody>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/exhibitions/", exhibition_id],
      queryFn: () => ExpoApiService.getExhibitionById({ exhibition_id }),
      enabled,
    });

  return {
    getExhibitionById: refetch,
    getExhibitionByIdData: data?.data,
    getExhibitionByIdError: error?.response?.data?.message,
    getExhibitionByIdRest: rest,
  };
};
