import { KeyboardTypeOptions } from "react-native";

export interface TextField {
    attribute: string;
    title: string;
    label: string;
    keyboardType: KeyboardTypeOptions;
    secure: boolean;
    onChange: (text: string) => void;
}