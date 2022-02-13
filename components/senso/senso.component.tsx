import { Button, Card, Surface } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { DropDownList } from "../dropdownlist";
import { Encuesta } from "./encuesta";
import { genderList, ageGroupList } from "../../constants/senso.constants";

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

interface Pregunta {
  component: any;
  next: string | undefined;
}

const initQuestions = (
  survey: Encuesta,
  setQuestions: React.Dispatch<
    React.SetStateAction<Map<string, Pregunta> | undefined>
  >,
  setAnswer: React.Dispatch<React.SetStateAction<Encuesta>>
) => {
  const questions = new Map<string, Pregunta>([
    [
      "genero",
      {
        component: () => {
          return (
            <DropDownList
              label="Genero"
              value={survey.genero}
              onSelect={(genero: string) =>
                setAnswer({ ...survey, genero: genero })
              }
              list={genderList}
            />
          );
        },
        next: "etario",
      },
    ],
    [
      "etario",
      {
        component: () => {
          return (
            <DropDownList
              label="Grupo Etario"
              value={survey.grupoEtario}
              onSelect={(grupo: string) =>
                setAnswer({ ...survey, grupoEtario: grupo })
              }
              list={ageGroupList}
            />
          );
        },
        next: "edad",
      },
    ],
  ]);
  setQuestions(new Map<string, Pregunta>(questions));
};

export const SensoComponent = () => {
  const [greet, setGreet] = useState(true);
  const [encuesta, setEncuesta] = useState<Encuesta>(new Encuesta());
  const [questions, setQuestions] = useState<Map<string, Pregunta>>();
  const [current, setCurrent] = useState<Pregunta>();
  useEffect(() => {
    initQuestions(encuesta, setQuestions, setEncuesta);
  }, []);
  useEffect(() => {
    setCurrent(questions?.get("genero"));
  }, [questions])

  if (greet) {
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
            onPress={() => setGreet(false)}
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
        <Button icon="page-next-outline" mode="contained" onPress={() => setCurrent(questions?.get(current?.next))}>
          Siguiente
        </Button>
      </>
    );
  }
};
