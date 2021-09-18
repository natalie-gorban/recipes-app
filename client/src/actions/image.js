import {
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAIL,
  SET_MESSAGE,
} from "./types";

import ImageService from "../services/image.service";

export const upload = (file) => (dispatch) => {
  return ImageService.upload(file).then(
    (response) => {
      dispatch({
        type: ADD_IMAGE_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: ADD_IMAGE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
