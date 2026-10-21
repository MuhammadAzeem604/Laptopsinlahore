import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/bootstrap.min.css";
import "./assets/css/main.css";
import "./assets/css/home.css";
import "./assets/css/skin.css";
import "./assets/css/admin.css";
// brand theme: colours + the custom home page / footer design (loaded last so
// it wins over the Molla theme styles)
import "./assets/css/brand.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
