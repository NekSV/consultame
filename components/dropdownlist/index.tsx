import DropDown from "react-native-paper-dropdown";
import { TouchableHighlight } from "react-native";
import React, { useState, ReactNode } from "react";
/**
 * React Native Paper Select Drop-Down List implementation with support
 * generic labels and values
 */
interface IDropDownList {
  label: string;
  value: string;
  onSelect:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  list: Array<{
    label: string;
    value: string | number;
    custom?: ReactNode;
  }>;
}
//TODO: add support for mode 
/**
 * Generic Drop-Down List implementation using React Native Paper Select
 * @param props {IDropDownList} 
 * @returns 
 */
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
