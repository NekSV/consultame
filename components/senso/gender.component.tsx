import DropDown from "react-native-paper-dropdown";
import { TouchableHighlight } from "react-native";
import React, { useState } from "react";
const genderList = [
  {
    label: "Masculino",
    value: "masculino",
  },
  {
    label: "Femenino",
    value: "femenino",
  },
  {
    label: "Otro",
    value: "Otro",
  },
];
interface GenderComponent {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
}

export const GenderComponent: React.FC<GenderComponent> = ({
  gender,
  setGender,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <TouchableHighlight onFocus={() => setShowDropDown(true)}>
      <DropDown
        label={"Genero"}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={gender}
        setValue={setGender}
        list={genderList}
      />
    </TouchableHighlight>
  );
};
