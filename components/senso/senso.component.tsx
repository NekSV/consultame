import { Button, Card, Surface } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import React, { useState } from "react";
import { GenderComponent } from "./gender.component";
import { AgeGroupComponent } from "./age-group.component";

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

export const SensoComponent = () => {
  const [greet, setGreet] = useState(true);
  const [gender, setGender] = useState("");
  const [age, setAgeGroup] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("gender");
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
        <Surface style={styles.box}>
          {currentQuestion === "gender" && (
            <GenderComponent gender={gender} setGender={setGender} />
          )}
          {currentQuestion === "ageGroup" && (
            <AgeGroupComponent group={age} setGroup={setAgeGroup} />
          )}
        </Surface>
        <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => setCurrentQuestion("ageGroup")}
        >
          Siguiente
        </Button>
      </>
    );
  }
};
