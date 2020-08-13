import React, { useState, useEffect } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import withCurrentUser from "@/lib/withCurrentUser";

import api from "@/src/api";

import CreateQuestionModal from "../common/CreateQuestionModal";
import QuestionPreview from "../common/question/QuestionPreview";
import SearchBar from "../common/search/SearchBar";
import CategoryBar from "../common/categories/CategoryBar";

const HomePage = ({ currentUser }) => {
  const { questions } = api();

  const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false);
  const [questionFeed, setQuestionFeed] = useState([]);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");

  useEffect(() => {
    getQuestionFeed();
  }, []);

  const getQuestionFeed = async () => {
    try {
      const res = await questions.index();
      if (res.status == 200) {
        setQuestionFeed(res.data);
      }
    } catch (error) {}
  };

  return (
    <HomeContainer>
      <SearchBar />
      <CategoryBar
        selected={selectedFilterCategory}
        setSelected={(categoryTitle) =>
          setSelectedFilterCategory(
            categoryTitle == selectedFilterCategory ? "" : categoryTitle
          )
        }
      />
      <QuestionContainer>
        {questionFeed.map((question) =>
          selectedFilterCategory ? (
            question.category &&
            selectedFilterCategory == question.category.title && (
              <QuestionPreview key={question.id} question={question} />
            )
          ) : (
            <QuestionPreview key={question.id} question={question} />
          )
        )}
      </QuestionContainer>
      {currentUser && (
        <CreateQuestionModal
          currentUser={currentUser}
          showCreateQuestionModal={showCreateQuestionModal}
          toggleModal={() =>
            setShowCreateQuestionModal(!showCreateQuestionModal)
          }
        />
      )}
    </HomeContainer>
  );
};

export default withCurrentUser(HomePage);

const HomeContainer = styled.div`
  ${tw`flex flex-col items-center`}
`;

const QuestionContainer = styled.div`
  ${tw`flex flex-col items-center max-w-full w-full`}
`;
