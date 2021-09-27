import { SET_SEARCH_TEXT, CLEAR_SEARCH_TEXT } from "../actions/types";

const initialState = {
  searchText: "",
};

export default function searchText(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_SEARCH_TEXT:
      return { searchText: payload };

    case CLEAR_SEARCH_TEXT:
      return { searchText: "" };

    default:
      return state;
  }
}
