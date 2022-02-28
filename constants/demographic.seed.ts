import { ISurveyQuestion } from "../components/census/survey.class";
import { genderList, ageGroupList } from "./census.constants";

export const demographicQuestions: Array<ISurveyQuestion> = [
  {
    id: "gender",
    allowedAnswers: genderList,
    statement: "¿Con qué género te identificas?",
    answer: genderList[0],
    next: "ageGroup",
  },
  {
    id: "ageGroup",
    allowedAnswers: ageGroupList,
    statement: "¿En qué etapa de la vida te encuentras?",
    answer: ageGroupList[0],
    next: "schoolLevel",
  },
  {
    id: "schoolLevel",
    allowedAnswers: ageGroupList,
    statement: "¿Escuela?",
    answer: ageGroupList[0],
  },
];
