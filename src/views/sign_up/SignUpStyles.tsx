import {StyleSheet} from 'react-native';

export const signUpStyles = StyleSheet.create({
  bottomSafeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topSafeAreaView: {
    flex: 0,
    backgroundColor: '#FFA500',
  },
  root: {
    backgroundColor: '#FFA500',
    height: '100%',
  },
  card: {
    flex: 90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  signUp: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
  },
  fieldsView: {
    margin: '5%',
    height: 'auto',
  },
  fieldView: {
    padding: 'auto',
  },
  buttonView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFA500',
    width: 'auto',
  },
});
