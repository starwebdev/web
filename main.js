import "@babel/polyfill";

import React, { createContext } from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { Context } from "./Context.js";
import Counter from "./Counter";
import reducer from "./reducers";

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const sagaMiddleware = createSagaMiddleware();
// const store = createStore(reducer, applyMiddleware(sagaMiddleware));
const store = configureStore(
  {
    reducer: reducer,
  },
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
const action = (type) => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Context.Provider value="Theme">
      <Counter
        value={store.getState()}
        onIncrement={() => action("INCREMENT")}
        onDecrement={() => action("DECREMENT")}
        onIncrementAsync={() => action("INCREMENT_ASYNC")}
      />
    </Context.Provider>,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
