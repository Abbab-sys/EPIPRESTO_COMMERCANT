import {StyleSheet} from 'react-native';

const text_font_family = 'Lato';
const text_font_style = 'normal';

export const addProductsStyles = StyleSheet.create({
  root: {
    flex: 1,
    margin: "4%",
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
    borderColor: '#FF0000',
    backgroundColor: '#FFA500',
    flex: 1,
    margin: '3%'
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    margin: 10,
    color: '#FFA500',
    fontFamily: text_font_family,
    fontStyle: text_font_style,
  },
  titleText: {
    fontSize: 17,
      fontWeight: "bold",
      textAlign: 'center',
      margin: 10,
      color: '#FFA500',
      fontFamily: text_font_family,
      fontStyle: text_font_style,
  },
  divider: {
    backgroundColor: "#FFA500",
    marginVertical: '4%',
    width: "100%"
  },
  headerFix: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEAEA',
    height: 50,
    width: '100%',
    padding: 10,
    marginBottom: 10,
  },
  back_button: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      marginLeft: 10,

  },
  back_button_icon: {
      width: 35,
      height: 35,
      tintColor: '#FFA500',
  },

  header_text: {
      fontFamily: text_font_family,
      fontStyle: text_font_style,
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      color: '#FFA500',
  },
  save_button: {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,
      marginRight: 10,
  },
  inputDescription: {
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
      minHeight: 120,
  },
  chip: {
    margin: 2,
    color: "white",
    backgroundColor:'#FFA50047', 
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: text_font_family,
    fontStyle: text_font_style,
    borderColor: '#FFA500',
    borderWidth: 1,
    borderRadius: 5
  }
});