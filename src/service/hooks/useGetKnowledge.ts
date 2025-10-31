import { IIdAndName } from "@/types/backendTypes";
import { useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { ExpoApiService } from "../expoApiService";

export const useGetKnowledge = ({ enabled }: { enabled: boolean }) => {
  const { refetch, data, error, isPending } =
    //   useQuery é usado para fazer chamadas que não alteram o banco (Get)
    useQuery<
      // Tipando a resposta e erro
      AxiosResponse<IIdAndName[]>,
      AxiosError<{ message: string }>
    >({
      queryKey: ["/knowledge"],
      queryFn: () => ExpoApiService.getKnowledge(),
      enabled,
    });

  return {
    getKnowledge: refetch,
    getKnowledgeData: data?.data,
    getKnowledgeError: error?.response?.data?.message,
    getKnowledgePending: isPending,
  };
};
