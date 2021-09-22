import {
  ADD_FILE_SUCCESS,
  ADD_FILE_FAIL,
} from "../actions/types";

const initialState = {
  imageName: undefined,
  imageUrl: undefined,
}
export default function uploadFile(state = initialState, action) {
  const { type, imageName, imageUrl } = action;

  switch (type) {
    case ADD_FILE_SUCCESS:
      return {
        ...state,
        imageName: imageName,
        imageUrl: imageUrl,
      };
    case ADD_FILE_FAIL:
      return {
        ...state,
        imageName: undefined,
        imageUrl: undefined,
      };
    default:
      return state;
  }
}
