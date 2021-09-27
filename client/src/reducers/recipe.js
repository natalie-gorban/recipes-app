import {
  ADD_RECIPE_SUCCESS,
  ADD_RECIPE_FAIL,
  GET_RECIPE_SUCCESS,
  GET_RECIPE_FAIL,
  GET_ALL_RECIPES_SUCCESS,
  GET_ALL_RECIPES_FAIL,
  DELETE_RECIPE_SUCCESS,
  DELETE_RECIPE_FAIL,
} from "../actions/types";

const initialState = {
  recipeId: undefined,
  recipes: [],
};
export default function recipe(state = initialState, action) {
  const { type, recipeId, recipes } = action;

  switch (type) {
    case ADD_RECIPE_SUCCESS:
      return {
        ...state,
        recipeId: recipeId,
      };
    case ADD_RECIPE_FAIL:
      return {
        ...state,
        recipeId: undefined,
      };
    case GET_ALL_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: recipes,
      };
    case GET_ALL_RECIPES_FAIL:
      return {
        ...state,
        recipes: [],
      };
    case GET_RECIPE_SUCCESS:
      return {
        ...state,
        recipeId: recipeId,
      };
    case GET_RECIPE_FAIL:
      return {
        ...state,
        recipeId: undefined,
      };
    case DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipeId: undefined,
      };
    case DELETE_RECIPE_FAIL:
      return {
        ...state,
        recipeId: recipeId,
      };
    default:
      return state;
  }
}
