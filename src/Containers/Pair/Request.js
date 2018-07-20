import React, { Component } from "react";
// Imports pour l'interface
import {
  Button,
  Paper,
  Typography,
  TextField,
  CircularProgress
} from "@material-ui/core";
import fetch from "../../api";
import MailIcon from "@material-ui/icons/MailOutline";

class Request extends Component {
  state = {
    email: "",
    loading: false,
    previouslySet: false
  };
  componentDidMount = () => {
    this.setState({
      email: localStorage.getItem("email"),
      previouslySet: true
    });
  };
  request = () => {
    const { email } = this.state;
    this.setState({ loading: true });

    fetch("/auth/request", {
      method: "POST",
      body: {
        email
      }
    })
      .then(response => {
        if (response.success) {
          localStorage.setItem("email", email);
          this.props.history.push("/pair/confirm");
        }
      })
      .finally(() => this.setState({ loading: false }));
  };
  render() {
    const { previouslySet, email } = this.state;

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
          <MailIcon />
          <Typography component="p">
            Votre telephone n'est associé à aucun compte.
          </Typography>
          <Typography component="p">
            Entrez votre adresse email pour associer un compte.
          </Typography>
        </Paper>
        <TextField
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          label="Adresse Email"
          type="email"
          style={{ marginBottom: 20, width: 300 }}
        />
        <Button
          variant="contained"
          style={{ marginBottom: 20 }}
          color="primary"
          onClick={this.request}
        >
          Associer
        </Button>
        {previouslySet && (
          <Button
            color="primary"
            onClick={() => this.props.history.push("/pair/confirm")}
          >
            J'ai déjà un code
          </Button>
        )}
      </div>
    );
  }
}

export default Request;
