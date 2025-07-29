import { getAllTopics } from "@/requests/topics";
import { useQuery } from "@tanstack/react-query";

export function useTopics() {
  return useQuery({
    queryKey: ["topics"],
    queryFn: () => getAllTopics(),
    retry: false,
  });
}
