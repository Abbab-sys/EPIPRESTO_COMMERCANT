import {useEffect} from 'react';
/*
 * Name: Credentials Hooks
 * Description: Call a function after a certain time. Useful for showing a message after a certain time with the credentials.
 * Author: Adam Naoui-Busson
 */

export const useTimeout = ({time, callback, callbackVars, dependencies}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      callback(callbackVars);
    }, time);
    return () => clearTimeout(timer);
  }, dependencies);
};
