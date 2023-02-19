import Back from "@/assets/Back.svg";
import DefaultFavicon from "@/assets/default_favi.svg";
import DefaultThumbnail from "@/assets/default_thumb.svg";
import Save from "@/assets/Save.svg";
import Unsave from "@/assets/Unsave.svg";
import { FallbackSkeleton } from "@/components/FallbackSkeleton";
import { SearchInput } from "@/components/Input";
import { Modal } from "@/components/Modal";
import {
  useDeleteRemoveBookmark,
  useGetSearchResults,
  usePostAddBookmark,
} from "@/providers/ApiProvider";
import { styled } from "@stitches/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image, { ImageLoaderProps } from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SearchResultType } from "../api/getSearchResult";

export type ErrorType = "401" | "500" | "none";

export default function SearchResult() {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const getSearchResults = useGetSearchResults();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState<ErrorType>("none");
  const searchResultsQuery = useQuery({
    queryKey: [getSearchResults],
    queryFn: () =>
      getSearchResults({
        query: router.query.keyword as string,
        size: 20,
        from: null,
      }),
    onError: () => setIsError("401"),
    suspense: true,
  });

  useEffect(() => {
    if (typeof router.query.keyword !== "string") return;
    setKeyword(router.query.keyword);
  }, [router.query.keyword]);

  return (
    <Container ref={containerRef}>
      {isError !== "none" && <Modal updateError={setIsError} />}
      <SearchResultHeader
        keyword={keyword}
        setKeyword={setKeyword}
        containerRef={containerRef}
      />
      <SearchResultsList>
        {searchResultsQuery.isFetching ? (
          <FallbackSkeleton />
        ) : (
          searchResultsQuery.data &&
          searchResultsQuery.data.documents.map((searchResult) => {
            return (
              <SearchResultItem
                key={searchResult.id}
                searchResult={searchResult}
                setIsError={setIsError}
              />
            );
          })
        )}
      </SearchResultsList>
    </Container>
  );
}

const SearchResultHeader = ({
  keyword,
  setKeyword,
  containerRef,
}: {
  keyword: string;
  setKeyword: Dispatch<SetStateAction<string>>;
  containerRef: RefObject<HTMLDivElement>;
}) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSearch = useCallback(async () => {
    router.push({
      pathname: "/result",
      query: { keyword: keyword },
    });
  }, [keyword, router]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    function handleScroll() {
      if (window.scrollY !== 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
  }, [containerRef, isScrolled]);

  return (
    <Header style={{ borderBottom: isScrolled ? "1px solid #f2f3f7" : "none" }}>
      <BackButton onClick={() => router.back()}>
        <Image alt="back" src={Back} />
      </BackButton>
      <SearchInput
        keyword={keyword}
        clearButton={!!keyword}
        updateKeyword={setKeyword}
        handleKeydownEnter={handleSearch}
      />
    </Header>
  );
};

const SearchResultItem = ({
  searchResult,
  setIsError,
}: {
  searchResult: SearchResultType["documents"][number];
  setIsError: Dispatch<SetStateAction<ErrorType>>;
}) => {
  const [isErrorThumb, setIsErrorThumb] = useState(false);
  const [isBookmarkSaved, setIsBookmarkSaved] = useState(searchResult.isSaved);
  const router = useRouter();
  const postAddBookmark = usePostAddBookmark();
  const deleteRemoveBookmark = useDeleteRemoveBookmark();

  const addBookmarkMutation = useMutation({
    mutationFn: () => postAddBookmark(searchResult.id),
    onError: (error, variables, context) => {
      setIsError("500");
      setIsBookmarkSaved(false);
    },
    onSuccess: (data, variables, context) => {
      setIsBookmarkSaved(true);
    },
  });

  const removeBookmarkMutation = useMutation({
    mutationFn: () => deleteRemoveBookmark(searchResult.id),
    onError: (error, variables, context) => {
      setIsError("500");
      setIsBookmarkSaved(true);
    },
    onSuccess: (data, variables, context) => {
      setIsBookmarkSaved(false);
    },
  });

  const addBookmark = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (!isBookmarkSaved) await addBookmarkMutation.mutateAsync();
    else await removeBookmarkMutation.mutateAsync();
  };

  return (
    <SearchResultItemContainer
      onClick={() => {
        router.replace(searchResult.url);
      }}
    >
      <SearchResultItemThumbnail>
        {isErrorThumb ? (
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
            onError={() => setIsErrorThumb(true)}
          />
        )}
      </SearchResultItemThumbnail>
      <SearchResultItemSubContainer>
        <SearchResultItemTitle>
          <SearchResultItemTitleTypography>
            {searchResult.title}
          </SearchResultItemTitleTypography>
        </SearchResultItemTitle>
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
          <LinkTypography>
            {parseUrltoHostname(new URL(searchResult.url))}
          </LinkTypography>
        </SearchResultItemContent>
      </SearchResultItemSubContainer>
      <BookmarkButton onClick={addBookmark}>
        <Image src={isBookmarkSaved ? Save : Unsave} alt="unsaved bookmark" />
      </BookmarkButton>
    </SearchResultItemContainer>
  );
};

const parseUrltoHostname = (url: URL) => {
  return url.hostname.replace("www.", "");
};

const imageLoader = (props: ImageLoaderProps) => {
  return `${props.src}`;
};

const SearchResultsList = styled("div", {
  padding: "0px 32px 0px 42px",
});

const BookmarkButton = styled("button", {
  width: 40,
  height: 40,
  borderRadius: 12,
  border: "none",
  backgroundColor: "transparent",
  marginLeft: "auto",
  "&:hover": {
    backgroundColor: "#F2F3F7",
  },
});

const SearchResultItemContainer = styled("button", {
  width: "100%",
  height: 104,
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: "none",
  borderRadius: 16,
  padding: "16px 12px 16px 20px",
  "&:hover": {
    backgroundColor: "#F8F9FB",
  },
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
  width: "100%",
  height: 20,
  borderRadius: 4,
  textAlign: "start",
});
const SearchResultItemTitleTypography = styled("span", {
  fontWeight: 700,
  fontSize: 15,
});
const SearchResultItemContent = styled("div", {
  height: 14,
  borderRadius: 4,
  marginTop: 31,
  display: "flex",
  alignItems: "center",
  gap: 6,
});
const LinkTypography = styled("span", {
  fontWeight: 400,
  fontSize: 13,
  color: "#959CA6",
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
  position: "sticky",
  top: 0,
  backgroundColor: "#FFFFFF",
  height: 80,
  padding: "0px 32px 0px 42px",
});

const Container = styled("div", {});
