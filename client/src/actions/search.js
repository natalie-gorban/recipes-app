import { SET_SEARCH_TEXT, CLEAR_SEARCH_TEXT } from "./types";

export const setSearchText = (searchText) => (dispatch) => dispatch({
  type: SET_SEARCH_TEXT,
  payload: searchText,
});

export const clearSearchText = () => (dispatch) => dispatch({
  type: CLEAR_SEARCH_TEXT,
});
