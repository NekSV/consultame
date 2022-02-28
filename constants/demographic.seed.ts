import { ISurveyQuestion } from "../components/census/survey.class";
import { genderList, ageGroupList, zoneList } from "./census.constants";

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
    next: "zone",
  },
  {
    id: "zone",
    allowedAnswers: zoneList,
    statement: "¿Desde dónde nos visitas?",
    answer: zoneList[0],
  },
];
