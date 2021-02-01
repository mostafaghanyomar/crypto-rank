//React
import React from "react";
import ReactDOM from "react-dom";
//Store
import { Provider } from "react-redux";
import store from "./store";
//ServiceWorker
import * as serviceWorker from "./serviceWorker";
//APP css
import "./index.css";
//Robots css
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
//App Component
import App from "./App";

//Rendering app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
