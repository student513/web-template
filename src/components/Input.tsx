import { styled } from "@stitches/react";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import Save from "../assets/Save.svg";
import Unsave from "../assets/Unsave.svg";

export const SearchInput = ({
  keyword,
  handleSearch,
  handleChangeText,
}: {
  keyword: string;
  handleSearch: () => void;
  handleChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    input.addEventListener("keydown", handleKeydown);
    input.addEventListener("focusin", handleFocusout);
    input.addEventListener("focusout", handleFocusin);

    return () => {
      input.removeEventListener("keydown", handleKeydown);
      input.removeEventListener("focusin", handleFocusout);
      input.removeEventListener("focusout", handleFocusin);
    };

    function handleKeydown(event: KeyboardEvent) {
      if (event.key !== "Enter") {
        return;
      }
      handleSearch();
    }
    function handleFocusout() {
      setFocused(false);
    }
    function handleFocusin() {
      setFocused(true);
    }
  }, [handleSearch]);

  return (
    <InputContainer>
      {focused ? (
        <Image alt="filled" src={Save} />
      ) : (
        <Image alt="unfilled" src={Unsave} />
      )}

      <Input
        ref={inputRef}
        placeholder="Search keyword"
        value={keyword}
        onChange={handleChangeText}
      />
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
  "&:focus-within": {
    border: "1.5px solid #00C3CC",
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
