import { deleteRemoveBookmark } from "@/pages/api/deleteRemoveBookmark";
import { getSearchResult, SearchResultType } from "@/pages/api/getSearchResult";
import { postAddBookmark } from "@/pages/api/postAddBookmark";
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

  const _postAddBookmark = async (documentId: string) => {
    const api = postAddBookmark(documentId);
    return await axiosInstance.post(api.url).then((x) => x.data);
  };

  const _deleteRemoveBookmark = async (documentId: string) => {
    const api = deleteRemoveBookmark(documentId);
    return await axiosInstance.delete(api.url).then((x) => x.data);
  };

  return {
    _getSearchResults,
    _postAddBookmark,
    _deleteRemoveBookmark,
  };
};

export const [
  ApiProvider,
  useGetSearchResults,
  usePostAddBookmark,
  useDeleteRemoveBookmark,
] = constate(
  useApiProvider,
  ({ _getSearchResults }) => _getSearchResults,
  ({ _postAddBookmark }) => _postAddBookmark,
  ({ _deleteRemoveBookmark }) => _deleteRemoveBookmark
);
