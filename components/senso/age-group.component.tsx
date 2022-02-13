import DropDown from "react-native-paper-dropdown";
import { TouchableHighlight } from "react-native";
import React, { useState } from "react";
interface IAgeGroup {
  group: string;
  setGroup: React.Dispatch<React.SetStateAction<string>>;
}
const ageGroupList = [
  {
    label: "Niño",
    value: "Niño",
  },
  {
    label: "Joven",
    value: "Joven",
  },
  {
    label: "Adulto",
    value: "Adulto",
  },
  {
    label: "Adulto Mayor",
    value: "Adulto Mayor",
  },
];
export const AgeGroupComponent: React.FC<IAgeGroup> = ({ group, setGroup }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <TouchableHighlight onFocus={() => setShowDropDown(true)}>
      <DropDown
        label={"Grupo Etario"}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={group}
        setValue={setGroup}
        list={ageGroupList}
      />
    </TouchableHighlight>
  );
};
