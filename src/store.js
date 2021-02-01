import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import uiReducer from "./store/reducers/ui";
import appReducer from "./store/reducers/app";

const rootReducer = combineReducers({
  app: appReducer,
  ui: uiReducer
});
const composeOrDevCompose =
  process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : // Allowing redux store debugging to be only in dev mode
  compose;
const store = createStore(
  rootReducer,
  composeOrDevCompose(applyMiddleware(thunk))
);
export default store;