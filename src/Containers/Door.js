// Notre ficher Door.js nous permet de définir un composant "Door" que l'on va
// pouvoir imorter et utiliser dans le reste du code. Ce composant sera la vue
// pour gérer la porte

import fetch from "../api";
import React, { Component } from "react";
// Imports pour l'interface
import { Button, Paper, Typography } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const prettifyTime = millis => {
  let minutes = Math.floor((millis / (1000 * 60)) % 60);
  let seconds = Math.floor((millis / 1000) % 60);
  return `${!!minutes ? minutes + ":" : ""}${
    !!seconds ? seconds : !minutes ? "" : "00"
  }`;
};

export default class Door extends Component {
  state = {
    remaining: 0,
    remainingTime: 0
  };
  componentWillUnmount() {
    window.clearInterval(this.state.lastInterval);
  }
  openDoor = timing => {
    if (!timing) timing = 60000;
    fetch("/door/open/" + (timing || "")).then(r => {
      console.log(r);
      clearInterval(this.lastInterval);

      this.setState({ remaining: 100, remainingTime: timing });

      const step = 100;
      const unit = 100 / (timing / step);

      this.lastInterval = setInterval(() => {
        this.setState({
          remaining: this.state.remaining - unit,
          remainingTime: this.state.remainingTime - step
        });
        if (this.state.remaining < 0) {
          this.setState({ remaining: 0, remainingTime: 0 });
          clearInterval(this.lastInterval);
        }
      }, step);
    });
  };
  render() {
    const { remaining, remainingTime } = this.state;
    return (
      <div className="page">
        <Paper
          style={{ margin: 20, padding: 20, textAlign: "center" }}
          elevation={1}
        >
          <ErrorIcon />
          <Typography component="p">
            Ceci n'est pas un jeu ! Cliquer sur le bouton va ouvrir le portail.
          </Typography>
        </Paper>
        <div style={{ width: 200, marginBottom: 30 }}>
          <CircularProgressbar
            text={prettifyTime(remainingTime)}
            styles={{
              trail: {
                strokeOpacity: 0.2,
                strokeWidth: 10
              },
              path: {
                transitionDuration: ".2s",
                strokeWidth: 5
              }
            }}
            percentage={remaining}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.openDoor()}
          style={{ marginBottom: 10 }}
        >
          Ouvrir le portail
        </Button>
        <Button
          color="primary"
          onClick={() => this.openDoor(3 * 60 * 1000)}
          style={{ marginBottom: 10 }}
        >
          Ouvrir 3 minutes
        </Button>
        <Button
          color="primary"
          onClick={() => this.openDoor(5 * 60 * 1000)}
          style={{ marginBottom: 10 }}
        >
          Ouvrir 5 minutes
        </Button>
      </div>
    );
  }
}
