// Un outil pour augmenter un peu la fetch api avec des paramètres de base

import config from "./config";

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export default (url, params) => {
  if (params && params.body && typeof params.body !== "string")
    params.body = JSON.stringify(params.body);

  if (!url.includes("http")) url = config.apiHost + url;

  return (
    fetch(url, {
      method: "GET",
      // necessaire pour échanger du json
      headers,
      // on ajoute les params parso passées en argument
      ...params
    })
      // fetch est un promise et l'on doit tranformer la reponse en json
      // seulement si la reponse est ok. Sinon renvoyer la reponse en erreur
      .then(res => {
        if (!res.ok) throw res;
        return res.json();
      })
  );
};

export const apiOptions = newHeaders => {
  headers = { ...headers, ...newHeaders };
};
