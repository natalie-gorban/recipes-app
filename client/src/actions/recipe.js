import {
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAIL,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAIL,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_FAIL,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAIL,
  SET_MESSAGE,
} from "./types";

import RecipeService from "../services/recipe.service";

export const addRecipe = (formData, imageName, recipeId) => (dispatch) => {
  return RecipeService.add(formData, imageName, recipeId).then(
    (response) => {
      dispatch({
        type: ADD_RECIPE_SUCCESS,
        recipeId: response.recipeId,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.message,
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

export const getAllRecipes = () => (dispatch) => {
  RecipeService.getAll()
    .then((response) => {
      dispatch({
        type: GET_ALL_RECIPES_SUCCESS,
        recipes: response.recipes,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.message,
      });

      return Promise.resolve();
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_ALL_RECIPES_FAIL,
        recipes: [],
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    });
};

export const getRecipe = (recipeId) => (dispatch) => {
  RecipeService.get(recipeId)
    .then((response) => {
      dispatch({
        type: GET_RECIPE_SUCCESS,
        formData: response.data.formData,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_RECIPE_FAIL,
        formData: undefined,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    });
};

export const deleteRecipe = (recipeId) => (dispatch) => {
  RecipeService.delete(recipeId)
    .then((response) => {
      dispatch({
        type: DELETE_RECIPE_SUCCESS,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message,
      });

      return Promise.resolve();
    })
    .catch((error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: DELETE_RECIPE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    });
};
