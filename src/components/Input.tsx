import { styled } from "@stitches/react";
import Image from "next/image";
import Save from "../assets/Save.svg";

export const SearchInput = () => {
  return (
    <InputContainer>
      <Image alt="search" src={Save} />
      <Input placeholder="Search keyword" />
    </InputContainer>
  );
};

const InputContainer = styled("div", {
  boxSizing: "border-box",
  height: 48,
  width: "100%",
  border: "1px solid #C2C6Ce",
  borderRadius: 1000,
  display: "flex",
  alignItems: "center",
  paddingLeft: 17.49,
  paddingRight: 17.49,
  gap: 17.29,
  "&:hover": {
    border: "1px solid #959CA6",
  },
});

const Input = styled("input", {
  border: "none",
  width: "100%",
  "&::placeholder": {
    fontSize: 16,
    fontWeight: 400,
    color: "#C2C6CE",
  },
});
