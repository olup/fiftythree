import React, { Component } from "react";
// Imports pour l'interface
import { Button, Paper, Typography, CircularProgress } from "@material-ui/core";
import ConfirmIcon from "@material-ui/icons/PhonelinkLock";
import PinInput from "react-pin-input";
import fetch, { apiOptions } from "../../api";

class Pair extends Component {
  state = {
    pairCode: "",
    loading: false
  };
  componentDidMount = () => {
    // If no email is save from the request page in the local storage, go to /pair/request
    if (!localStorage.getItem("email"))
      this.props.history.push("/pair/request");
  };
  confirm = pairCode => {
    // get registered email
    const email = localStorage.getItem("email");
    this.setState({ loading: true });

    // ask for a token from email and confirmation code
    fetch("/auth/pair", {
      method: "POST",
      body: {
        email,
        pairCode
      }
    })
      .then(response => {
        if (response.success) {
          localStorage.removeItem("email");
          // save the token in local storage
          localStorage.setItem("token", response.token);
          // Set default headers for authentification token
          apiOptions({
            "x-access-token": response.token
          });
          // goto main page
          this.props.history.push("/");
        }
      })
      .finally(() => this.setState({ loading: false }));
  };
  render() {
    if (this.state.loading)
      return (
        <div className="page">
          <CircularProgress />
        </div>
      );
    return (
      <div className="page">
        <Paper
          style={{ margin: 20, padding: 20, textAlign: "center" }}
          elevation={1}
        >
          <ConfirmIcon />
          <Typography component="p">
            Un code à quatre chiffre vous a été transmis par email. Entrez le
            code pour lier votre appareil.
          </Typography>
        </Paper>
        <PinInput
          length={4}
          type="numeric"
          style={{ padding: "10px" }}
          inputStyle={{
            backgroundColor: "#fff",
            borderColor: "#ccc",
            color: "#ccc"
          }}
          inputFocusStyle={{ color: "#222" }}
          onComplete={pairCode => this.confirm(pairCode)}
        />
      </div>
    );
  }
}

export default Pair;
