import { StyleSheet } from "react-native";

const text_font_family = 'Lato';
const text_font_style = 'normal';

export const addVariantStyles = StyleSheet.create({
  view: {
    width: '90%',
    minHeight: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    alignSelf: 'center',

  },
  input: {
    margin: 10,
    marginBottom: 0,
    borderWidth: 1,
    padding: 0,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFA500',
    borderRadius: 10,
    width: '90%',
    fontFamily: text_font_family,
    fontStyle: text_font_style,
    fontWeight: 'normal',
    fontSize: 15,
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
    fontFamily: text_font_family,
    fontStyle: text_font_style,
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
    color: 'black'    
    },
  button: {
    marginTop: 20,
    width: 200,
    height: 40,
    backgroundColor: '#FFA500',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: text_font_family,
    fontStyle: text_font_style,
    margin: 10,
    color: '#FFA500'
  },
  inactive_label: {
    margin: 5,
    fontFamily: text_font_family,
    fontStyle: text_font_style,
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 18,
  },
});