import React from "react";
import QuestionPreview from "./QuestionPreview";
import styled from "styled-components";
import tw from "tailwind.macro";

const QuestionList = () => {
  return (
    <Container>
      <QuestionPreview />
      <QuestionPreview />
      <QuestionPreview />
    </Container>
  );
};

export default QuestionList;

const Container = styled.div`
  ${tw`w-full`}
`;
