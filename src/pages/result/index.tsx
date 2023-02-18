import { useRouter } from "next/router";
import SearchResult from "./SearchResult";

export default function Result() {
  const router = useRouter();

  return <>{router.isReady && <SearchResult />}</>;
}
