import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import uploadFile from "./upload-file";
import recipe from "./recipe";
import search from "./search";

export default combineReducers({
  auth,
  message,
  uploadFile,
  recipe,
  search,
});
