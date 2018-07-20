import React, { Component } from "react";
import { Route, Link, Redirect, withRouter } from "react-router-dom";

// Imports pour l'interface
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import KeyIcon from "@material-ui/icons/VpnKey";
import ContactsIcon from "@material-ui/icons/Contacts";
import SettingsIcon from "@material-ui/icons/Settings";

// imports des pages
import Door from "./Containers/Door";
import Contacts from "./Containers/Contacts";
import Pair from "./Containers/Pair";

// On peut aussi importer des css comme cela
import "./app.css";

// Declaration d'une route "privée" avant laquelle on peut faire un contrôle
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const token = localStorage.getItem("token");
      if (token) return <Component {...props} />;
      else {
        console.log("Not allowed to use app");
        return <Redirect to="/pair" />;
      }
    }}
  />
);

class App extends Component {
  render() {
    return (
      // L'origine de notre app
      <div className="main-frame">
        {/* Pour le moment, note header est vide */}
        <div className="header" />

        {/* "Content" contient les routes : le rendu se fera en fonction de l'url */}
        <div className="content">
          {/* Les deux première routes sont privées : il faut une association pour y acceder */}
          <PrivateRoute path="/door" component={Door} />
          <PrivateRoute path="/contacts" component={Contacts} />
          <Route path="/pair" component={Pair} />
        </div>

        {/* Enfin, notre footer */}
        <BottomNavigation value={this.props.location.pathname}>
          <BottomNavigationAction
            label="Porte"
            value="/door"
            icon={<KeyIcon />}
            component={Link}
            to="/door"
          />
          <BottomNavigationAction
            label="Contacts"
            value="/contacts"
            icon={<ContactsIcon />}
            component={Link}
            to="/contacts"
          />
          <BottomNavigationAction
            label="Paramètres"
            value="settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
        {/*Par default, rediriger vers /door */}
        <Route exact path="/" render={() => <Redirect to="/door" />} />
      </div>
    );
  }
}

export default withRouter(App);
