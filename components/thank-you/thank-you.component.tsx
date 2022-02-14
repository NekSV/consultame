import { StyleSheet, Text } from "react-native";
import { Button, Divider, Surface } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { goodbyeText } from "../../constants";
const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    padding: RFValue(40),
    marginHorizontal: RFValue(10),
    textAlign: "center",
  },
  goodbye: {
    textAlign: "center",
    margin: RFValue(8),
    fontSize: RFValue(32),
    padding: RFValue(5),
  },
});
interface IThankYou {
  callback: () => void;
}
export const ThankYouComponent: React.FC<IThankYou> = ({ callback }) => {
  return (
    <Surface style={styles.box}>
      <Text style={styles.goodbye}>{goodbyeText.thanks}</Text>
      <Divider />
      <Button
        icon="page-previous-outline"
        mode="contained"
        onPress={() => callback()}
      >{goodbyeText.reset}</Button>
    </Surface>
  );
};
