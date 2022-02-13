import DropDown from "react-native-paper-dropdown";
import { TouchableHighlight } from "react-native";
import React, { useState, ReactNode } from "react";

interface IDropDownList {
  label: string;
  value: string;
  onSelect: React.Dispatch<React.SetStateAction<string>> | Function;
  list: Array<{
    label: string;
    value: string | number;
    custom?: ReactNode;
  }>;
}

export const DropDownList: React.FC<IDropDownList> = ({
  label,
  value,
  onSelect,
  list,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  return (
    <TouchableHighlight onFocus={() => setShowDropDown(true)}>
      <DropDown
        label={label}
        mode={"outlined"}
        visible={showDropDown}
        showDropDown={() => setShowDropDown(true)}
        onDismiss={() => setShowDropDown(false)}
        value={value}
        setValue={onSelect}
        list={list}
      />
    </TouchableHighlight>
  );
};
