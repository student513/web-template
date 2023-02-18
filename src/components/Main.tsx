import { styled } from "@stitches/react";
import Image from "next/image";
import { useState } from "react";
import Logo from "../assets/Logo.svg";
import { SearchInput } from "./Input";

export const Main = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <MainContainer>
      <div
        style={{ marginTop: 360, display: "flex", justifyContent: "center" }}
      >
        <Image alt="logo" src={Logo} />
      </div>
      <div style={{ marginTop: 80 }}>
        <SearchInput keyword={keyword} updateKeyword={setKeyword} />
      </div>
    </MainContainer>
  );
};

const MainContainer = styled("div", {
  paddingLeft: 104,
  paddingRight: 104,
});
