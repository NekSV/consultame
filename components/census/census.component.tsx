import { Button, Card, Surface } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { DropDownList } from "../dropdownlist";
import { Survey, ISurvey } from "./survey.class";
import { genderList, ageGroupList } from "../../constants/census.constants";
import { IQuestion, QuestionListType, QuestionList } from "./census.interface";

const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  box: {
    width: screen.width - screen.width * 0.3,
    marginTop: screen.height * 0.33,
    marginLeft: screen.width * 0.15,
    paddingTop: screen.height * 0.1,
    paddingBottom: screen.height * 0.1,
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
  setAnswer: React.Dispatch<React.SetStateAction<ISurvey>>
) => {
  const questions = new QuestionList([
    [
      0,
      {
        component: () => {
          return (
            <DropDownList
              label="Genero"
              value={survey.gender}
              onSelect={(_value: string) => {
                console.log('seteando valor', _value)
                setAnswer((current) => ({ ...current, ['gender']: _value }));
              }}
              list={genderList}
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
            <DropDownList
              label="Grupo Etario"
              value={survey.agreGroup}
              onSelect={(_value: string) =>
                setAnswer((current) => ({ ...current, agreGroup: _value }))
              }
              list={ageGroupList}
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
  const [current, setCurrent] = useState<IQuestion>();
  useEffect(() => {
    initQuestions(survey, setQuestions, setSurvey);
  }, []);
  useEffect(() => {
    setCurrent(questions?.get(0));
  }, [questions]);

  if (greetings) {
    return (
      <Card style={styles.box}>
        <Card.Title
          title="Hola!"
          subtitle="Ayudanos a servirte mejor, contestando las siguientes preguntas"
        />
        <Card.Content>
          <Button
            icon="page-next-outline"
            mode="contained"
            onPress={() => toggleGreeting(false)}
          >
            Continuar
          </Button>
        </Card.Content>
      </Card>
    );
  } else {
    return (
      <>
        <Surface style={styles.box}>{current?.component()}</Surface>
        <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => setCurrent(questions?.get(current?.next || -1))}
        >
          Siguiente
        </Button>
      </>
    );
  }
};
