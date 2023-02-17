import Image from "next/image";
import { SearchInput } from "./Input";
import Logo from "../assets/Logo.svg";
import { styled } from "@stitches/react";
import { ChangeEvent, useCallback, useState } from "react";

export const Main = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    console.log(keyword);
  };
  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

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
          handleSearch={handleSearch}
          handleChangeText={handleChangeText}
        />
      </div>
    </MainContainer>
  );
};

const MainContainer = styled("div", {
  paddingLeft: 104,
  paddingRight: 104,
});
