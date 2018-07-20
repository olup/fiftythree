// Le fichier contact est la page de la liste de contact

import React, { Component } from "react";
// Imports pour l'interface
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  List,
  TextField
} from "@material-ui/core";
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";

// on peut aussi définir un composant comme une simple function
const Line = ({ name, status, id, phone, email }) => (
  <ListItem key={email || id} role={undefined} button>
    <ListItemText primary={name} secondary={status} />
    <ListItemSecondaryAction>
      {/* Ce passage ne s'affichera que si la valeur phone est renseignée à l'appel du composant */}
      {phone && (
        <a href={`tel:${phone}`}>
          <IconButton aria-label="Comments">
            <PhoneIcon />
          </IconButton>
        </a>
      )}
      {/* Ce passage ne s'affichera que si la valeur email est renseignée à l'appel du composant */}
      {email && (
        <a href={`mailto:${email}`}>
          <IconButton aria-label="Comments">
            <MailIcon />
          </IconButton>
        </a>
      )}
    </ListItemSecondaryAction>
  </ListItem>
);

export default class Contacts extends Component {
  render() {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div style={{ width: "100%", padding: 20, boxSizing: "border-box" }}>
          <TextField
            label="Chercher dans les contacts"
            style={{ width: "100%" }}
          />
        </div>
        <div
          style={{
            overflow: "auto",
            flex: 1
          }}
        >
          <List style={{ width: "100%" }}>
            <Line
              name="loup TOPALIAN"
              status="Locataire immeuble B"
              email="loup.topalian@gmail.com"
              phone="0781015895"
            />
            <Line
              name="roland TOPALIAN"
              status="Locataire immeuble B"
              email="roland@gmail.com"
            />
          </List>
        </div>
      </div>
    );
  }
}
