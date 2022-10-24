import { ImageSourcePropType } from "react-native";
import { ImageSource } from "react-native-vector-icons/Icon";

export interface Language {
    name: string;
    imageSource: ImageSourcePropType;
    code: string;
  }