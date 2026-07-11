import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export const useKnowledgeFiles = () => {
  return useQuery({
    queryKey: ["knowledgeFiles"],
    queryFn: async () => {
      const { data } = await apiClient.get("/knowledge");
      return data;
    }
  });
};

export const useDeleteKnowledgeFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fileName) => {
      const { data } = await apiClient.delete(`/knowledge/${fileName}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledgeFiles"] });
    }
  });
};
