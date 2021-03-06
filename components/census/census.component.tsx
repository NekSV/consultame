import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Button, Divider, Surface } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { greetingText } from "../../constants";
import { ThankYouComponent } from "../thank-you";
import { ISurvey, Survey } from "./survey.class";
import { demographicQuestions } from "../../constants/demographic.seed";
import { QuestionComponent } from "../question/question.component";
import { getAssignedSurvey } from "../../config/device";
import { log } from '../../config/persistence/persistence';
type QuestionComponentType = JSX.Element;
type QuestionList = Map<string, JSX.Element>;
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
const FIRST_QUESTION = "gender";

const initSurvey = async (
  survey: ISurvey,
  setSurvey: React.Dispatch<React.SetStateAction<ISurvey>>,
  next: (id: string) => void
): Promise<QuestionList> => {
  const organizedQuestions: QuestionList = new Map<string, JSX.Element>();
  const { questions } = survey;
  //extra will be used to fetch the assigned survey from firestore
  const extra = await getAssignedSurvey();
  log.info(JSON.stringify(extra));
  for (let entry of questions.entries()) {
    const [key, question] = entry;
    organizedQuestions.set(
      question.id,
      <QuestionComponent
        key={question.id}
        allowedAnswers={question.allowedAnswers}
        statement={question.statement}
        setAnswer={(answer) => {
          question.answer = answer;
          setSurvey((current) => {
            current.questions.set(question.id, { ...question, answer: answer });
            return current;
          });
          next(question.next || "return");
        }}
      />
    );
  }
  return new Promise((resolve, reject) => {
    resolve(organizedQuestions);
  });
};

export const CensusComponent = () => {
  const [greetings, toggleGreeting] = useState(true);
  const [survey, setSurvey] = useState<ISurvey>(new Survey());
  const [questionList, setQuestionList] = useState<QuestionList>();
  const [currentQuestion, setCurrentQuestion] =
    useState<() => QuestionComponentType | undefined>();
  const [currentId, setCurrentId] = useState(FIRST_QUESTION);
  // Quick jump to the next question
  const nextQuestion = (id: string) => {
    setCurrentId(id);
  };
  useEffect(() => {
    setCurrentQuestion(() => questionList?.get(currentId));
  }, [currentId]);
  // On Document ready, initialize the list of available questions for the survey
  useEffect(() => {
    //setSurvey(new Survey(demographicQuestions));
    const getSurvey = async () => {
      // get assigned survey
      const data = await initSurvey(
        new Survey(demographicQuestions),
        setSurvey,
        nextQuestion
      );
      // set local question list
      setQuestionList(data);
    };
    if (!questionList) getSurvey();
  }, []);
  useEffect(() => {
    console.log("passing here just once");
    const firstQuestion = questionList?.get(FIRST_QUESTION);
    if (firstQuestion) {
      setCurrentQuestion(() => firstQuestion);
    }
  }, [questionList]);

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
          onPress={() => {
            toggleGreeting(false);
          }}
        >
          <Text style={styles.next}>{greetingText.next}</Text>
        </Button>
      </Surface>
    );
  } else {
    return (
      <Surface style={styles.box}>
        {currentQuestion ? (
          currentQuestion
        ) : (
          <ThankYouComponent
            callback={() => {
              toggleGreeting(true);
              nextQuestion(FIRST_QUESTION);
            }}
          />
        )}
      </Surface>
    );
  }
};
