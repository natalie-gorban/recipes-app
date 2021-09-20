import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import uploadFile from "./upload-file";

export default combineReducers({
  auth,
  message,
  uploadFile
});
