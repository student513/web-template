import { styled } from "@stitches/react";
import { useState } from "react";

export const FallbackSkeleton = () => {
  const [array] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <>
      {array.map((x, index) => {
        return (
          <Container key={index}>
            <Thumbnail />
            <SubContainer>
              <Title />
              <Content />
            </SubContainer>
          </Container>
        );
      })}
    </>
  );
};

const Container = styled("div", {
  width: "100%",
  height: 104,
  display: "flex",
  alignItems: "center",
});
const SubContainer = styled("div", {
  marginLeft: 16,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
const Thumbnail = styled("div", {
  width: 72,
  height: 72,
  backgroundColor: "#F2F3F7",
  borderRadius: 12,
});
const Title = styled("div", {
  width: 457,
  height: 20,
  backgroundColor: "#F2F3F7",
  borderRadius: 4,
  marginTop: 19,
});
const Content = styled("div", {
  width: 160,
  height: 14,
  backgroundColor: "#F2F3F7",
  borderRadius: 4,
  marginTop: 31,
  marginBottom: 20,
});
