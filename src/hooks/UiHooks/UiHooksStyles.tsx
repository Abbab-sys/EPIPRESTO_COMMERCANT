import {StyleSheet} from 'react-native';

/*
 * Name: Snackbar Styles
 * Description: This file contains the styles for the snackbar hook.
 * Author: Alessandro van Reusel
 */

export const SnackbarStyles = StyleSheet.create({
  successSnackbar: {
    backgroundColor: '#4caf50',
  },
  errorSnackbar: {
    backgroundColor: '#f44336',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
});
