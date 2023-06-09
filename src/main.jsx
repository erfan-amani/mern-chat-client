import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";
import App from "./App";
import setupAxios from "./library/setupAxios";
import axios from "./library/http";
import "./locales/index";
import "./index.css";
import SocketContextProvider from "@/context/socket/SocketContextProvider";

setupAxios(axios, store);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
