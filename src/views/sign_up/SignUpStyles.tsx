import {StyleSheet} from 'react-native';

export const signUpStyles = StyleSheet.create({
  root: {
    backgroundColor: '#FFA500',
    height: '100%',
    flex: 1,
  },
  card: {
    elevation: 4,
    flex: 13,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  signUp: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 50,
  },
  fieldsView: {
    margin: '5%',
    height: 'auto',
    // borderColor: '#000000',
    // borderWidth: 1,
  },
  fieldView: {
    padding: 'auto',
  },
  buttonView: {
    // height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FF0000',
    // borderWidth: 1,
    // height: '30%',
  },
  button: {
    backgroundColor: '#FFA500',
    width: '70%',
  },
});
