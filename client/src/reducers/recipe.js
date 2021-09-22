import {
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAIL,
  EDIT_RECIPE_SUCCESS,
  EDIT_RECIPE_FAIL,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAIL,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAIL,
} from "../actions/types";

const initialState = {
  imageName: undefined,
  formData: undefined,
  recipeId: undefined,
}
export default function recipe(state = initialState, action) {
  const { type, imageName, formData, recipeId } = action;

  switch (type) {
    case ADD_RECIPE_SUCCESS:
      return {
        ...state,
        imageName: imageName,
        formData: formData,
        recipeId: recipeId,
      };
    case ADD_RECIPE_FAIL:
      return {
        ...state,
        imageName: undefined,
        formData: undefined,
        recipeId: undefined,
      };
    case EDIT_RECIPE_SUCCESS:
      return {
        ...state,
        imageName: imageName,
        formData: formData,
        recipeId: recipeId,
      };
    case EDIT_RECIPE_FAIL:
      return {
        ...state,
        imageName: undefined,
        formData: undefined,
        recipeId: undefined,
      };
    case GET_RECIPE_SUCCESS:
      return {
        ...state,
        imageName: imageName,
        formData: formData,
        recipeId: recipeId,
      };
    case GET_RECIPE_FAIL:
      return {
        ...state,
        imageName: undefined,
        formData: undefined,
        recipeId: undefined,
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        imageName: undefined,
        formData: undefined,
        recipeId: undefined,
      };
    case DELETE_RECIPE_FAIL:
      return {
        ...state,
        imageName: imageName,
        formData: formData,
        recipeId: recipeId,
      };
    default:
      return state;
  }
}
