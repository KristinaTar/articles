import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store";
import { HashRouter } from "react-router-dom";
import "./index.scss";
import { ScrollToTop } from "./scripts/helpers";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop />
        <App />
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
