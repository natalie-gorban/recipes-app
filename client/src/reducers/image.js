import {
  ADD_IMAGE_SUCCESS,
  ADD_IMAGE_FAIL,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export default function image(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_IMAGE_SUCCESS:
      return {
        ...state,
        isUploaded: true,
      };
    case ADD_IMAGE_FAIL:
      return {
        ...state,
        isUploaded: false,
      };
    default:
      return state;
  }
}
