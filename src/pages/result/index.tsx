import Back from "@/assets/Back.svg";
import { SearchInput } from "@/components/Input";
import { useSearchResultsQuery } from "@/providers/TanstackQueryProvider";
import { styled } from "@stitches/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { SearchResultType } from "../api/getSearchResult";

export default function SearchResult() {
  const router = useRouter();
  const searchResultsQuery = useSearchResultsQuery();
  const [keyword, setKeyword] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResultType>();

  const handleSearch = useCallback(async () => {
    router.push({
      pathname: "/result",
      query: { keyword: keyword },
    });
  }, [keyword, router]);

  useEffect(() => {
    if (typeof router.query.keyword !== "string") return;
    setKeyword(router.query.keyword);
  }, [router.query.keyword]);

  useEffect(() => {
    (async () => {
      if (typeof router.query.keyword !== "string") return;
      const searchResults = await searchResultsQuery({
        query: router.query.keyword,
        size: 20,
        from: null,
      });
      setSearchResults(searchResults);
    })();
  }, [router.query.keyword, searchResultsQuery]);

  return (
    <Container>
      <Header>
        <BackButton onClick={() => router.back()}>
          <Image alt="back" src={Back} />
        </BackButton>
        <SearchInput
          keyword={keyword}
          clearButton={true}
          updateKeyword={setKeyword}
          handleKeydownEnter={handleSearch}
        />
      </Header>
      {searchResults &&
        searchResults.documents.map((searchResult) => {
          return <div key={searchResult.id}>{searchResult.title}</div>;
        })}
    </Container>
  );
}

const BackButton = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  backgroundColor: "transparent",
  width: 40,
  height: 40,
  "&:hover": {
    backgroundColor: "#F8F9FB",
  },
});

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 12,
});

const Container = styled("div", {
  padding: "16px 40px 0px 32px",
});
