import { styled } from "@stitches/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Logo from "../assets/Logo.svg";
import { SearchInput } from "./Input";

export const Main = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = useCallback(async () => {
    router.push({
      pathname: "/result",
      query: { keyword: keyword },
    });
  }, [keyword, router]);

  return (
    <MainContainer>
      <div
        style={{ marginTop: 360, display: "flex", justifyContent: "center" }}
      >
        <Image alt="logo" src={Logo} />
      </div>
      <div style={{ marginTop: 80 }}>
        <SearchInput
          keyword={keyword}
          updateKeyword={setKeyword}
          handleKeydownEnter={handleSearch}
        />
      </div>
    </MainContainer>
  );
};

const MainContainer = styled("div", {
  paddingLeft: 104,
  paddingRight: 104,
});
