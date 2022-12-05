import {StyleSheet} from 'react-native';

/*
 * Name: Login Styles
 * Description: This file contains the styles for the login screen.
 * Author: Adam Naoui-Busson, Zouhair Derouich
 */

export const LoginStyles = StyleSheet.create({
  root: {
    backgroundColor: '#FFA500',
    width: '100%',
    height: '100%',
  },
  imageView: {
    flex: 25,
    justifyContent: 'flex-end',
  },
  image: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 75,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
  },
  loginTitle: {
    fontSize: 19,
    fontWeight: '600',
    fontFamily: 'Lato',
    justifyContent: 'flex-end',
  },
  loginTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },

  fieldsView: {
    flex: 20,
    justifyContent: 'space-around',
    marginHorizontal: '5%',
  },

  loginButtonWrapper: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpView: {
    marginTop: '5%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 'auto',
  },
  button: {
    paddingHorizontal: '10%',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    backgroundColor: '#FF9933',
    width: 'auto',
    borderRadius: 13,
  },
  newTo: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    color: 'black',
  },
  signUp: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    color: '#FFA500',
  },
});
