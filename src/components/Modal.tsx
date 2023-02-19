import Close from "@/assets/Close.svg";
import { ErrorType } from "@/pages/result/SearchResult";
import { styled } from "@stitches/react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

export const Modal = ({
  updateError,
}: {
  updateError: Dispatch<SetStateAction<ErrorType>>;
}) => {
  return (
    <ModalLayer>
      <ModalBox>
        <div style={{ display: "flex" }}>
          <ModalTitle>Somthing went wrong</ModalTitle>
          <div style={{ marginLeft: "auto" }}>
            <CloseButton onClick={() => updateError("none")}>
              <Image src={Close} alt="close" />
            </CloseButton>
          </div>
        </div>
        <div
          style={{
            marginTop: 46,
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <MainButton onClick={() => updateError("none")}>
            <span style={{ color: "#ffffff" }}>OK</span>
          </MainButton>
        </div>
      </ModalBox>
    </ModalLayer>
  );
};

const ModalLayer = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(51, 55, 61, 0.5);",
  zIndex: 10,
});

const ModalBox = styled("div", {
  boxSizing: "border-box",
  width: 360,
  height: 160,
  borderRadius: 20,
  backgroundColor: "#FFFFFF",
  marginTop: 432,
  marginLeft: 204,
  padding: 24,
});

const ModalTitle = styled("span", {
  fontWeight: 700,
  fontSize: 20,
});

const CloseButton = styled("button", {
  width: 20,
  height: 20,
  border: "none",
  backgroundColor: "transparent",
});

const MainButton = styled("button", {
  width: 69,
  height: 42,
  backgroundColor: "#00C3CC",
  border: "none",
  borderRadius: 10,
  fontSize: 14,
  fontWeight: 700,
});
