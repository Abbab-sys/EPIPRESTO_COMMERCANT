import {StyleSheet} from 'react-native';

export const addProductsStyles = StyleSheet.create({
  root: {
    flex: 1,
    margin: "4%"
  },
  input: {
    height: 50,
    margin: 10,
    borderWidth: 1,
    padding: 2,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 5,
  },
  button: {
    borderColor: '#FF0000',
    backgroundColor: '#FFA500',
    flex: 1,
    margin: '3%'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
  // tags
  tag: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  tagLabel: {
    color: '#FFFFFF',
  }
});