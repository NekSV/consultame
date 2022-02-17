import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Button, Divider, Surface } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { greetingText } from "../../constants";
import { ThankYouComponent } from "../thank-you";
import { IQuestion, QuestionListType } from "./census.interface";
import { initQuestions } from "./init-census.component";
import { ISurvey, Survey } from "./survey.class";
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

export const CensusComponent = () => {
  const [greetings, toggleGreeting] = useState(true);
  const [survey, setSurvey] = useState<ISurvey>(new Survey());
  const [questions, setQuestions] = useState<QuestionListType>();
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // Quick jump to the next question, don't rely on strings that just makes its too difficult.
  const nextQuestion = (next: number) => setCurrentIndex(next);
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
        <Text key="title" style={styles.greeting}>
          {greetingText.hey}
        </Text>
        <Text key="subtitle" style={styles.legend}>
          {greetingText.legend}
        </Text>
        <Divider />
        <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => toggleGreeting(false)}
        >
          <Text style={styles.next}>{greetingText.next}</Text>
        </Button>
      </Surface>
    );
  } else {
    return (
      <Surface style={styles.box}>
        {currentQuestion ? (
          currentQuestion?.component()
        ) : (
          <ThankYouComponent
            callback={() => {
              toggleGreeting(true);
              nextQuestion(0);
            }}
          />
        )}
      </Surface>
    );
  }
};
