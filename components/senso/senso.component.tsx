import { Button, Card } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
const screen = Dimensions.get("screen");

const styles = StyleSheet.create({
  box: {
    width: screen.width - screen.width * 0.3,
    marginTop: screen.height * 0.3,
    marginLeft: screen.width * 0.15,
  }
});
export const SensoComponent = () => {
  return (
    <Card style={styles.box}>
      <Card.Title title="Hola!" />
      <Card.Content>
        <Button
          icon="page-next-outline"
          mode="contained"
          onPress={() => console.log("Pressed")}
        >
          Continuar
        </Button>
      </Card.Content>
    </Card>
  );
};
