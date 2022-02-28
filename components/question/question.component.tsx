import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import { Button, Divider, Surface } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    margin: RFValue(2),
    padding: RFValue(8),
    justifyContent: "center",
  },
  answers: {
    padding: RFValue(20),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statement: {
    textAlign: "center",
    fontSize: RFValue(18),
    padding: RFValue(20),
  },
  answerOption: {
    fontSize: RFValue(12),
    color: "white",
  },
  spacer: {
    margin: RFValue(3),
  },
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
    <Button
      key={`${answer}_button`}
      mode="contained"
      onPress={() => setAnswer(answer)}
      style={styles.spacer}
    >
      <Text key={`${answer}_text`} style={styles.answerOption}>
        {answer}
      </Text>
    </Button>
  ));
}

/**
 * Individual Question Component
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
      <Text style={styles.statement}>{statement}</Text>
      <Divider />
      <Surface style={styles.answers}>
        {buildButtons(allowedAnswers, setAnswer)}
      </Surface>
    </Surface>
  );
};
