import { useGetSearchResults } from "@/providers/ApiProvider";
import { useQueryClient } from "@tanstack/react-query";
import constate from "constate";

const useTanstackQueryProvider = () => {
  const getSearchResults = useGetSearchResults();
  const queryClient = useQueryClient();

  const searchResultsQuery = async ({
    query,
    size,
    from,
  }: {
    query: string;
    size: number;
    from: number | null;
  }) => {
    return await queryClient.fetchQuery({
      queryKey: [getSearchResults],
      queryFn: () => getSearchResults({ query, size, from }),
    });
  };

  return {
    searchResultsQuery,
  };
};

export const [TanstackQueryProvider, useSearchResultsQuery] = constate(
  useTanstackQueryProvider,
  ({ searchResultsQuery }) => searchResultsQuery
);
