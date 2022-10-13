import { StyleSheet } from "react-native";


export const addVariantStyles = StyleSheet.create({
  view: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    width: "80%",
    flex: 1
  },
  input: {
    margin: 10,
    marginBottom: 0,
    borderWidth: 1,
    padding: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 5,
  },
  button: {
    borderColor: '#FF0000',
    backgroundColor: '#FFA500'
  },
});