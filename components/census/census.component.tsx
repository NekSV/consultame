import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { ageGroupList, genderList } from "../../constants/census.constants";
import { QuestionComponent } from "../question";
import { IQuestion, QuestionList, QuestionListType } from "./census.interface";
import { ISurvey, Survey } from "./survey.class";
import { greetingText } from "../../constants/greetings.contants";

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    padding: RFValue(40),
    marginHorizontal: RFValue(10),
    textAlign: "center",
  },
  greeting: {
    textAlign: "center",
    margin: RFValue(8),
    fontSize: RFValue(32),
    padding: RFValue(5),
  },
  legend: {
    textAlign: "center",
    margin: 10,
    fontSize: RFValue(16),
    padding: RFValue(5),
  },
  next: {
    fontSize: RFValue(14),
    color: "white",
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
  // Quick jump to the next question, don't rely on strings that just makes its too difficult.
  const nextQuestion = () => setCurrentIndex(currentIndex + 1);
  // On Document ready, initialize the list of available questions for the survey
  useEffect(() => {
    initQuestions(survey, setQuestions, setSurvey, nextQuestion);
  }, []);
  // Once the list of questions has been defined, quickly setup the first item to be render
  useEffect(() => {
    setCurrentQuestion(questions?.get(currentIndex));
  }, [questions]);
  // Everytime the index change make sure to update the current question selection
  useEffect(() => {
    setCurrentQuestion(questions?.get(currentIndex));
  }, [currentIndex]);

  if (greetings) {
    return (
      <Surface style={styles.box}>
        <Text style={styles.greeting}>{greetingText.hey}</Text>
        <Text style={styles.legend}>{greetingText.legend}</Text>
        <Divider />
        <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => toggleGreeting(false)}
        ><Text style={styles.next}>{greetingText.next}</Text></Button>
      </Surface>
    );
  } else {
    return <Surface style={styles.box}>{currentQuestion?.component()}</Surface>;
  }
};
