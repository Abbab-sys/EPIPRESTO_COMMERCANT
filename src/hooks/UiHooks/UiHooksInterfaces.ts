/*
 * Name: Snackbar Interface
 * Description: This file contains the interface for the snackbar hook.
 * Author: Alessandro van Reusel
 */

export interface SnackbarKind {
  messageTranslationKey: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
