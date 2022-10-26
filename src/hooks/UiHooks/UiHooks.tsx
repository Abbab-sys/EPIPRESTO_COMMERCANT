import {SnackbarKind} from "./UiHooksInterfaces";
import React, {useState} from "react";
import {Snackbar} from "react-native-paper";
import {useTranslation} from "react-i18next";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SnackbarStyles } from "./UiHooksStyles";
import { View } from "react-native";

export const useSnackbar = (init: SnackbarKind) => {
  const [isOpen, setIsOpen] = useState(false);
  const {t: translation} = useTranslation('translation')

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [snackbarKind, setSnackbarKind] = useState<SnackbarKind>(init);

  function update(kind: SnackbarKind) {
    setSnackbarKind(kind);
  }

  const handleSnackbarClosing = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  if (!isOpen) {
    return [<></>,
      {
        open,
        close,
        update,
      }] as const
  }
  const snackbar = (
    <Snackbar
      visible={isOpen}
      style={snackbarKind.severity === 'success' ? SnackbarStyles.successSnackbar : SnackbarStyles.errorSnackbar}
      duration={6000}
      onDismiss={handleSnackbarClosing}>
          {translation(snackbarKind.messageTranslationKey)}
    </Snackbar>)
  return [snackbar, {
    open,
    close,
    update,
  }] as const

}
export const useTextInput = (value: string, standBy: { onStandBy: () => void, args: {}, time: number }, errorsSet: Set<string>, onChange: (event: any) => void) => {

}
