import { styled } from "@stitches/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Logo from "../assets/Logo.svg";
import { SearchInput } from "./Input";

export const Main = () => {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = async () => {
    router.push({
      pathname: "/result",
      query: { keyword: keyword },
    });
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
