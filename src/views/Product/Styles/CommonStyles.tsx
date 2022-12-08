import {StyleSheet} from 'react-native';

/*
 * Name : Common Styles
 * Description : This file contains the common styles for the product and variant components.
 * Author : Zouhair Derouich
 */

export const commonStyles = StyleSheet.create({
  divider: {
    backgroundColor: '#FFA500',
    marginTop: '4%',
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageInnerView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 100,
  },
  innerText: {
    textAlign: 'center',
  },
  bottomDivider: {
    backgroundColor: '#FFA500',
    marginVertical: '4%',
    width: '100%',
  },
});
