import Back from "@/assets/Back.svg";
import { SearchInput } from "@/components/Input";
import { useGetSearchResults } from "@/providers/ApiProvider";
import { styled } from "@stitches/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchResult() {
  const getSearchResults = useGetSearchResults();
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>(
    router.query.keyword as string
  );
  const searchResults = useQuery({
    queryKey: [getSearchResults],
    queryFn: () =>
      getSearchResults({
        query: keyword as string,
        size: 20,
        from: null,
      }),
  }).data;

  return (
    <Container>
      <Header>
        <BackButton>
          <Image alt="back" src={Back} />
        </BackButton>
        <SearchInput
          keyword={keyword}
          clearButton={true}
          updateKeyword={setKeyword}
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
