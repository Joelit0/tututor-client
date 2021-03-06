import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";
import { useRouter } from "next/router";

import api from "@/src/api";

import SimpleReactValidator from "simple-react-validator";
import Dropdown from "react-dropdown";
import { Close, Add } from "@material-ui/icons";

const CreateQuestionModal = ({
  currentUser,
  showCreateQuestionModal,
  toggleModal,
}) => {
  const Router = useRouter();
  const validator = new SimpleReactValidator();

  const { questions } = api();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [category, setCategory] = useState(null);

  const categoriesList = [
    { value: 0, label: "Matemáticas" },
    { value: 1, label: "Ciencias Sociales" },
    { value: 2, label: "Historia" },
    { value: 3, label: "Geografía" },
    { value: 4, label: "Administración" },
    { value: 5, label: "TIC" },
    { value: 6, label: "Biología" },
    { value: 7, label: "Derecho" },
    { value: 8, label: "Lengua" },
  ];

  const handleCreate = async () => {
    try {
      setShowErrorMessage(false);
      if (!validator.allValid())
        throw new Error("Validations not totally passed");

      const res = await questions.create({
        title: title,
        description: description,
        category: category.label,
      });
      if (res.status == 201) {
        // Redirect to the created question page
        Router.push(`/question/${res.data.question.id}`);
        // Hide modal
        toggleModal();
      }
    } catch (error) {
      setShowErrorMessage(true);
    }
  };

  return (
    <>
      {currentUser && showCreateQuestionModal && (
        <ModalContainer>
          <ModalOverlay onClick={toggleModal} />
          <Modal>
            <ModalTitle>Crea una pregunta</ModalTitle>
            <TitleField
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {validator.message("title", title, "required")}
            <DescriptionField
              rows="10"
              placeholder="Describe tu pregunta..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {validator.message("description", description, "required")}
            <div>
              <CustomDropdown
                value={category}
                placeholder="Categorías"
                options={categoriesList}
                onChange={(option) => setCategory(option)}
              />
            </div>
            {validator.message("category", category, "required")}
            {showErrorMessage && (
              <ErrorText>
                ¡Oops! Revisa que hayas definido tu título, descripción y
                categoría correctamente 🧐
              </ErrorText>
            )}
            <Actions>
              <CancelButton
                onClick={toggleModal}
                className="transition duration-150 ease-in-out"
              >
                Cancelar
              </CancelButton>
              <CreateButton
                onClick={handleCreate}
                className="transition duration-150 ease-in-out"
              >
                Crear pregunta
              </CreateButton>
            </Actions>
            <CloseModal onClick={toggleModal} />
          </Modal>
        </ModalContainer>
      )}
      {currentUser && (
        <CreateQuestionButton onClick={toggleModal}>
          <Add />
        </CreateQuestionButton>
      )}
    </>
  );
};

export default CreateQuestionModal;

const CreateQuestionButton = styled.button`
  ${tw`fixed p-3 rounded-full text-white`}
  background-color: ${(props) => props.theme.colors.pinkCyclamen.normal};
  right: 2rem;
  bottom: 2rem;
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12);
`;

const ModalContainer = styled.div`
  ${tw`z-20 fixed h-full w-full flex justify-center items-center inset-0`}
`;

const ModalOverlay = styled.div`
  ${tw`fixed h-full w-full`}
  background-color: rgba(0, 0, 0, .3);
`;

const Modal = styled.div`
  ${tw`z-20 relative p-6 h-full w-full max-w-screen-lg bg-white sm:rounded-lg flex flex-col justify-center`}

  @media (min-width: 640px) {
    width: 90%;
    height: 50%;
  }
`;

const ModalTitle = styled.h1`
  ${tw`mb-4 text-3xl leading-9 font-extrabold`}
  color: ${(props) => props.theme.colors.violetBlue.normal};
`;

const TitleField = styled.input`
  ${tw`w-full mb-4 px-3 py-2 text-sm leading-5 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300`}
`;

const DescriptionField = styled.textarea`
  ${tw`resize-none w-full mb-4 px-3 py-2 text-sm leading-5 text-gray-900 border border-solid border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300`}
`;

const ErrorText = styled.span`
  ${tw`mt-2 pb-2 text-red-600 text-sm font-medium`}
`;

const Actions = styled.div`
  ${tw`w-full flex justify-end mt-8`}
`;

const CreateButton = styled.button`
  ${tw`ml-4 px-4 py-2 text-sm font-semibold text-gray-300 text-white rounded-md`}
  background-color: ${(props) => props.theme.colors.violetBlue.normal};
`;

const CancelButton = styled.button`
  ${tw`px-2 py-2 text-sm font-semibold`}
  color: ${(props) => props.theme.colors.violetBlue.normal};
  :hover {
    color: ${(props) => props.theme.colors.violetBlue.light};
  }
`;

const CloseModal = styled(Close)`
  ${tw`absolute m-2 cursor-pointer`}
  right: 1rem;
  top: 1rem;
  color: ${(props) => props.theme.colors.violetBlue.normal};
`;

const CustomDropdown = styled(Dropdown)`
  .Dropdown-control {
    ${tw`relative block w-48 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 text-sm leading-5`}
  }
  .Dropdown-menu {
    max-height: 7rem;
    ${tw`w-48 rounded-b-md border border-gray-300 text-sm`}
  }
`;
