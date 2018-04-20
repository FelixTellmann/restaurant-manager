import logger from "redux-logger";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { errorReducer, userReducer, navReducer } from './HomeReducer';

const HomeStore = createStore(
  combineReducers(
    {
      errorReducer,
      userReducer,
      navReducer
    }
  ), {}, composeWithDevTools(applyMiddleware(thunk, logger))
);

export default HomeStore;