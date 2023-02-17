export type SearchResultType = {
  documents: {
    id: string;
    faviconUrl: string;
    imageUrl: string;
    title: string;
    url: string;
    netloc: string;
    isSaved: boolean;
  }[];
  isLast: boolean;
};

export const getSearchResult = ({
  query,
  size,
  from,
}: {
  query: string;
  size: number;
  from: number | null;
}) => {
  return {
    method: "get",
    url: "/search/documents",
    params: {
      query,
      size,
      from,
    },
  };
};
