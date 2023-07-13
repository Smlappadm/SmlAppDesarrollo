import React from "react";
import App from "./App.jsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.baseURL = "https://smlapp.onrender.com/api";
// axios.defaults.baseURL = "https://sml-app.com/api";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <IntlProvider locale="en-US" massages={{}}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </IntlProvider>
);




// HOVER

// <div className="relative h-fit w-fit group flex justify-center items-center">
// <p className="w-fit  whitespace-nowrap hidden absolute text-[#9c9b9b] -top-7 group-hover:block">
//   Ingresa al Dashboard
// </p>
// ACA VA EL LABEL, P o H1
// </div>