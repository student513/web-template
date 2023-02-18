import { styled } from "@stitches/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Clear from "../assets/Clear.svg";
import Save from "../assets/Save.svg";
import Unsave from "../assets/Unsave.svg";

export const SearchInput = ({
  keyword,
  clearButton,
  updateKeyword,
}: {
  keyword: string;
  clearButton?: boolean;
  updateKeyword: Dispatch<SetStateAction<string>>;
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = useCallback(async () => {
    router.push({
      pathname: "/result",
      query: { keyword: keyword },
    });
  }, [keyword, router]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    updateKeyword(e.target.value);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) {
      return;
    }
    input.addEventListener("keydown", handleKeydown);
    input.addEventListener("focusin", handleFocusin);
    input.addEventListener("focusout", handleFocusout);

    return () => {
      input.removeEventListener("keydown", handleKeydown);
      input.removeEventListener("focusin", handleFocusin);
      input.removeEventListener("focusout", handleFocusout);
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
      {clearButton && (
        <ClearButton onClick={() => updateKeyword("")}>
          <Image alt="clear" src={Clear} />
        </ClearButton>
      )}
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

const ClearButton = styled("button", {
  display: "flex",
  alignItems: "center",
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
});
