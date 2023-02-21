import { useGetSearchResults } from "@/providers/ApiProvider";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchResultsQuery = (
  keyword: string,
  size: number,
  from: number,
  onError: () => void,
  onSuccess: () => void
) => {
  const getSearchResults = useGetSearchResults();

  return useInfiniteQuery({
    queryKey: [keyword],
    queryFn: () =>
      getSearchResults({
        query: keyword,
        size,
        from,
      }),
    getNextPageParam: (lastPage, allPages) => {
      return {
        query: keyword,
        size,
        from,
      };
    },
    onError,
    onSuccess,
    suspense: true,
  });
};
