import React from "react";
import { Button, Divider, Headline, Surface } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    margin: 2,
    padding: 8,
    elevation: 4,
    justifyContent: "center",
  },
  answers: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statement: {
    textAlign: "center"
  }
});
type SetAnswerType = (value: string) => void;
/**
 * Question Component Contract
 */
interface IQuestionComponent {
  // What would you like to quantify?
  statement: string;
  // Exact set of allowed answers to quantify
  allowedAnswers: Array<string>;
  // Store the response in a state property
  setAnswer: SetAnswerType;
}
/**
 * List of buttons containing all available answers for the current question
 * @param allowedAnswers {Array<string>} list of allowed answers for the current question
 * @param setAnswer {useState Function} function to store the answer
 * @returns {Array<Button>}  List of pressable answers
 */
function buildButtons(allowedAnswers: Array<string>, setAnswer: SetAnswerType) {
  return allowedAnswers.map((answer: string) => (
    <Button key={answer} mode="contained" onPress={() => setAnswer(answer)}>
      {answer}
    </Button>
  ));
}

/**
 * Indivual Question Component
 * @param props {IQuestionComponent} Individual Question Values
 * @returns {JSX.Element} Question Container
 */

export const QuestionComponent: React.FC<IQuestionComponent> = ({
  statement,
  allowedAnswers,
  setAnswer,
}) => {
  return (
    <Surface style={styles.container}>
      <Headline style={styles.statement}>{statement}</Headline>
      <Divider />
      <Surface style={styles.answers}>
        {buildButtons(allowedAnswers, setAnswer)}
      </Surface>
    </Surface>
  );
};
