import React, { useState, useEffect } from "react";
import Error from "next/error";
import { NextSeo } from "next-seo";
import Layout from "../../layout/Layout";
import QuestionIdPage from "../../components/pages/question/Question[Id]Page";

import api from "@/src/api";

const Question = ({ currentUser, question, errorCode }) => {
  if (errorCode) {
    return <Error statusCode={errorCode} />;
  }

  const { title, description } = question;
  return (
    <Layout>
      <NextSeo title={title} description={description} />
      <QuestionIdPage question={question} />
    </Layout>
  );
};

export default Question;

export async function getServerSideProps(context) {
  const { questions } = api();

  // Fetch question
  let question = null;
  let errorCode = false;
  try {
    const id = context.params.id;
    const res = await questions.show(id, context.req.headers.cookie);

    question = res.data.question;
  } catch (error) {
    errorCode = error.response.status;
  }

  return {
    props: {
      errorCode,
      question,
    }, // Will be passed to the page component as props
  };
}
