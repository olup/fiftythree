import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import { apiOptions } from "./api";
import "normalize.css";
// import registerServiceWorker from "./registerServiceWorker";
import { createBrowserHistory, createHashHistory } from "history";

// header de base à chaque requête
apiOptions({
  "x-access-token": localStorage.getItem("token")
});

// pour le router, en mode ajouté à la page home
const configureHistory = () => {
  return window.matchMedia("(display-mode: standalone)").matches
    ? createHashHistory()
    : createBrowserHistory();
};

const history = configureHistory();

// Ici, c'est le rendu de notre app (voir public/index.html).
// Ce n'est pas important, tout va se trouver dans app.js
// On entoure simplement <App/> avec un router qui permettra ensuite
// d'avoir des routes qui s'affichent en fonction de l'url,
// Les liens, etc...
ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// Ce qui suit, c'est pour fabriquer des app progressive
// registerServiceWorker();
