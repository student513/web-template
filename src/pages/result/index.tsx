import { useGetSearchResults } from "@/providers/ApiProvider";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function SearchResult() {
  const getSearchResults = useGetSearchResults();
  const router = useRouter();

  const searchResultsQuery = useQuery({
    queryKey: [getSearchResults],
    queryFn: () => getSearchResults({ query: "라이너", size: 20, from: null }),
  }).data;
  console.log(searchResultsQuery);
  return <div>this is result</div>;
}
