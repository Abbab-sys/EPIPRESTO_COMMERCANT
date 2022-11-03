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
    flex: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    height: 50,
    width: '100%',
    padding: 10,
    marginBottom: 10,
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
    tintColor: 'black',
},
 
});
