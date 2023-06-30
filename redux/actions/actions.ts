import {
  ADD_TOAST_NOTIFICATION,
  REMOVE_TOAST_NOTIFICATION,
  SET_JWT_TOKEN,
  SET_USER,
} from './const';

export const setUserInfoAction = (newUserInfo = null) => {
  return {
    type: SET_USER,
    payload: {
      newUserInfo,
    },
  };
};

export const setJwtTokenAction = (newJwtToken: string | null = null) => {
  return {
    type: SET_JWT_TOKEN,
    payload: {
      newJwtToken,
    },
  };
};

export const addToastNotification = (newToastNotification: {
  message: string;
  type: 'success' | 'failed' | 'warning';
}) => {
  return {
    type: ADD_TOAST_NOTIFICATION,
    payload: {
      newToastNotification,
    },
  };
};

export const removeToastNotification = (toastNotificationId: string) => {
  return {
    type: REMOVE_TOAST_NOTIFICATION,
    payload: {
      toastNotificationId,
    },
  };
};
