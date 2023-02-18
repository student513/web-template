import Back from "@/assets/Back.svg";
import DefaultFavicon from "@/assets/default_favi.svg";
import DefaultThumbnail from "@/assets/default_thumb.svg";
import { FallbackSkeleton } from "@/components/FallbackSkeleton";
import { SearchInput } from "@/components/Input";
import { useGetSearchResults } from "@/providers/ApiProvider";
import { styled } from "@stitches/react";
import { useQuery } from "@tanstack/react-query";
import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { SearchResultType } from "../api/getSearchResult";

export default function SearchResult() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const getSearchResults = useGetSearchResults();
  const searchResultsQuery = useQuery({
    queryKey: [getSearchResults],
    queryFn: () =>
      getSearchResults({
        query: router.query.keyword as string,
        size: 20,
        from: null,
      }),
    suspense: true,
  });

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
      {searchResultsQuery.isFetching ? (
        <FallbackSkeleton />
      ) : (
        searchResultsQuery.data &&
        searchResultsQuery.data.documents.map((searchResult) => {
          return (
            <SearchResultItem
              key={searchResult.id}
              searchResult={searchResult}
            />
          );
        })
      )}
    </Container>
  );
}

const SearchResultItem = ({
  searchResult,
}: {
  searchResult: SearchResultType["documents"][number];
}) => {
  const [isError, setIsError] = useState(false);
  return (
    <SearchResultItemContainer>
      <SearchResultItemThumbnail>
        {isError ? (
          <Image src={DefaultThumbnail} alt={"thumbnail"} />
        ) : (
          <Image
            src={searchResult.url}
            alt={"thumbnail"}
            loader={() =>
              imageLoader({ src: searchResult.imageUrl, width: 72 })
            }
            width={72}
            height={72}
            onError={() => setIsError(true)}
          />
        )}
      </SearchResultItemThumbnail>
      <SearchResultItemSubContainer>
        <SearchResultItemTitle>{searchResult.title}</SearchResultItemTitle>
        <SearchResultItemContent>
          {searchResult.faviconUrl ? (
            <Image
              src={searchResult.faviconUrl}
              alt="favicon"
              width={14}
              height={14}
              loader={() =>
                imageLoader({ src: searchResult.faviconUrl, width: 14 })
              }
            />
          ) : (
            <Image src={DefaultFavicon} alt={"favicon"} />
          )}
        </SearchResultItemContent>
      </SearchResultItemSubContainer>
    </SearchResultItemContainer>
  );
};

const imageLoader = (props: ImageLoaderProps) => {
  return `${props.src}`;
};

const SearchResultItemContainer = styled("div", {
  width: "100%",
  height: 104,
  display: "flex",
  alignItems: "center",
});
const SearchResultItemSubContainer = styled("div", {
  marginLeft: 16,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
const SearchResultItemThumbnail = styled("div", {
  width: 72,
  height: 72,
  backgroundColor: "#F2F3F7",
  borderRadius: 12,
});
const SearchResultItemTitle = styled("div", {
  width: 457,
  height: 20,
  borderRadius: 4,
  marginTop: 19,
});
const SearchResultItemContent = styled("div", {
  width: 160,
  height: 14,
  borderRadius: 4,
  marginTop: 31,
  marginBottom: 20,
});

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
  marginBottom: 8,
});

const Container = styled("div", {
  padding: "16px 40px 0px 32px",
});
