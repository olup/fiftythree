// Une page blog, ou board, pour faire passer des messages à tout le monde

import React, { Component } from "react";
import moment from "moment";
import fetch from "../api";
// Imports pour l'interface
import {
  TextField,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

const News = ({ title, subtitle, content, date, from }) => (
  <Card style={{ margin: 20 }}>
    <CardContent>
      <Typography variant="headline" component="h2">
        {title}
      </Typography>
      <Typography color="textSecondary">
        {!!date && moment(date).format("DD/MM/YYYY HH:mm")}
      </Typography>
      <Typography color="textSecondary">De {from || "Inconnu"}</Typography>
      <Typography component="p">{content}</Typography>
    </CardContent>
  </Card>
);

export default class Board extends Component {
  state = {
    newPost: false,
    news: [],
    newPostTitle: "",
    newPostContent: ""
  };
  componentDidMount() {
    this.loadNews();
    this.myInterval = setInterval(() => this.loadNews(), 10000);
  }
  componentWillUnmount() {
    clearInterval(this.myInterval);
  }
  loadNews = () => {
    fetch("/news").then(response => {
      this.setState({ news: response.news || [] });
    });
  };
  postNews = () => {
    const { newPostContent, newPostTitle } = this.state;
    this.closeDialog();
    fetch("/news", {
      method: "POST",
      body: { title: newPostTitle, content: newPostContent }
    }).then(response => {
      this.loadNews();
    });
  };
  closeDialog = () => {
    this.setState({ newPostContent: "", newPostTitle: "", newPost: false });
  };
  render() {
    const { news, newPostContent, newPostTitle } = this.state;
    return (
      <div style={{ flex: 1 }}>
        <Button
          color="primary"
          onClick={() => this.setState({ newPost: true })}
          fullWidth
          style={{ marginTop: 30 }}
        >
          Poster une nouvelle info
        </Button>

        {news.map((info, index) => <News key={index} {...info} />)}

        <Dialog
          open={this.state.newPost}
          onClose={this.closeDialog}
          fullWidth
          PaperProps={{ style: { borderRadius: 0, margin: 0 } }}
        >
          <DialogTitle id="form-dialog-title">Poster sur le board</DialogTitle>
          <DialogContent>
            <TextField
              style={{ marginBottom: 20 }}
              inputProps={{ style: { fontSize: 30 } }}
              autoFocus
              placeholder="Titre"
              fullWidth
              value={newPostTitle}
              onChange={e => this.setState({ newPostTitle: e.target.value })}
            />

            <TextField
              placeholder="Contenu"
              fullWidth
              value={newPostContent}
              onChange={e => this.setState({ newPostContent: e.target.value })}
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={this.postNews} color="primary">
              Poster
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
