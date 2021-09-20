import {
  ADD_FILE_SUCCESS,
  ADD_FILE_FAIL,
  SET_MESSAGE,
} from "./types";

import UploadFileService from "../services/upload-file.service";

export const upload = (file, name) => (dispatch) => {
  return UploadFileService.upload(file, name).then(
    (response) => {
      dispatch({
        type: ADD_FILE_SUCCESS,
        imageName: response.data.name,
        imageUrl: response.data.url,
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
        type: ADD_FILE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
