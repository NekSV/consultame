import React from "react";
import { genderList, ageGroupList } from "../../constants";
import { QuestionComponent } from "../question";
import { QuestionList, QuestionListType } from "./census.interface";
import { ISurvey } from "./survey.class";

export const initQuestions = (
  survey: ISurvey,
  setQuestions: React.Dispatch<
    React.SetStateAction<QuestionListType | undefined>
  >,
  setAnswer: React.Dispatch<React.SetStateAction<ISurvey>>,
  next: (val: number) => void
) => {
  const questions = new QuestionList([
    [
      0,
      {
        component: () => {
          return (
            <QuestionComponent
              allowedAnswers={genderList}
              setAnswer={(value: string) => {
                setAnswer((current) => ({ ...current, ["gender"]: value }));
                next(1);
              }}
              statement="¿Con qué género te identificas?"
            />
          );
        },
        next: 1,
      },
    ],
    [
      1,
      {
        component: () => {
          return (
            <QuestionComponent
              allowedAnswers={ageGroupList}
              setAnswer={(value: string) => {
                setAnswer((current) => ({ ...current, ["ageGroup"]: value }));
                next(2);
              }}
              statement="¿En qué etapa de la vida te encuentras?"
            />
          );
        },
        next: 2,
      },
    ],
  ]);
  setQuestions(questions);
};