import {StyleSheet} from 'react-native';

/*
 * Name: Inventory Styles
 * Description: This file contains the styles for the inventory page.
 * Author: Zouhair Derouich
 */

const text_font_family = 'Lato';
const text_font_style = 'normal';

export const inventoryStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  products: {
    flexDirection: 'column',
  },
  surface: {
    flex: 10,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  cardStyle: {
    elevation: 4,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFA500',
    flexDirection: 'column',
  },
  innerView: {
    flexDirection: 'row',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 4,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#FFA500',
    fontFamily: text_font_family,
    fontStyle: text_font_style,
  },
  cardTitle: {
    color: 'white',
  },
  innerCardTitle: {
    color: 'black',
  },
  data: {
    color: '#FFA500',
  },
  errorText: {
    textAlign: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  loading: {
    justifyContent: 'center',
    flex: 1,
    marginBottom: '2%',
  },
});
