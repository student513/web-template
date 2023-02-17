import { getSearchResult, SearchResultType } from "@/pages/api/getSearchResult";
import constate from "constate";
import { useAxiosInstance } from "./AxiosInstanceProvider";

export const useApiProvider = () => {
  const axiosInstance = useAxiosInstance();

  const _getSearchResults = async ({
    query,
    size,
    from,
  }: {
    query: string;
    size: number;
    from: number | null;
  }) => {
    const api = getSearchResult({ query, size, from });
    return await axiosInstance
      .get<SearchResultType>(api.url, {
        params: api.params,
      })
      .then((x) => x.data);
  };
  return {
    _getSearchResults,
  };
};

export const [ApiProvider, useGetSearchResults] = constate(
  useApiProvider,
  ({ _getSearchResults }) => _getSearchResults
);
