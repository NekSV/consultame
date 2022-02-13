import {
  Button,
  Card,
  Divider,
  Headline,
  Subheading,
  Surface,
} from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { Survey, ISurvey } from "./survey.class";
import { genderList, ageGroupList } from "../../constants/census.constants";
import { IQuestion, QuestionListType, QuestionList } from "./census.interface";
import { QuestionComponent } from "../question";

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    padding: 8,
    marginHorizontal: 8,
  },
  safeContainerStyle: {
    flex: 1,
    justifyContent: "center",
  },
});

const initQuestions = (
  survey: ISurvey,
  setQuestions: React.Dispatch<
    React.SetStateAction<QuestionListType | undefined>
  >,
  setAnswer: React.Dispatch<React.SetStateAction<ISurvey>>,
  next: () => void
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
                next();
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
                setAnswer((current) => ({ ...current, ["agreGroup"]: value }));
                next();
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

export const SensoComponent = () => {
  const [greetings, toggleGreeting] = useState(true);
  const [survey, setSurvey] = useState<ISurvey>(new Survey());
  const [questions, setQuestions] = useState<QuestionListType>();
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextQuestion = () => setCurrentIndex(currentIndex + 1);
  useEffect(() => {
    initQuestions(survey, setQuestions, setSurvey, nextQuestion);
  }, []);
  useEffect(() => {
    setCurrentQuestion(questions?.get(currentIndex));
  }, [questions]);
  useEffect(() => {
    setCurrentQuestion(questions?.get(currentIndex));
  }, [currentIndex]);

  if (greetings) {
    return (
      <Surface style={styles.box}>
        <Headline>Hola!</Headline>
        <Subheading>
          Ayúdanos a servirte mejor, contestando las siguientes preguntas
        </Subheading>
        <Divider />
        <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => toggleGreeting(false)}
        >
          Continuar
        </Button>
      </Surface>
    );
  } else {
    console.log("======================");
    console.log({ ...survey });
    return (
      <>
        <Surface style={styles.box}>{currentQuestion?.component()}</Surface>
        {/* <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => setCurrent(questions?.get(current?.next || -1))}
        >
          Siguiente
        </Button> */}
      </>
    );
  }
};
