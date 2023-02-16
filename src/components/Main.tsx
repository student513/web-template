import Image from "next/image";
import { SearchInput } from "./Input";
import Logo from "../assets/Logo.svg";
import { styled } from "@stitches/react";

export const Main = () => {
  return (
    <MainContainer>
      <div
        style={{ marginTop: 360, display: "flex", justifyContent: "center" }}
      >
        <Image alt="logo" src={Logo} />
      </div>
      <div style={{ marginTop: 80 }}>
        <SearchInput />
      </div>
    </MainContainer>
  );
};

const MainContainer = styled("div", {
  paddingLeft: 104,
  paddingRight: 104,
});
