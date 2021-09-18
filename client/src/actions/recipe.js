import {
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAIL,
  EDIT_RECIPE_SUCCESS,
  EDIT_RECIPE_FAIL,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAIL,
  SET_MESSAGE,
} from "./types";

import RecipeService from "../services/auth.service";

export const addDummyRecipe = (name, file, body) => (dispatch) => {
  return RecipeService.addDummyRecipe(name, file, body).then(
    (response) => {
      dispatch({
        type: ADD_RECIPE_SUCCESS,
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
        type: ADD_RECIPE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
