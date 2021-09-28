import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; // second part of Chrome extension for debugging React components
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const middleware = [thunk]; // add possibility to dispatch async actions

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
