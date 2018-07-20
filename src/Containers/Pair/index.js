import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Request from "./Request";
import Confirm from "./Confirm";

class Pair extends Component {
  render() {
    return (
      <div className="page">
        <Route exact path="/pair/request" component={Request} />
        <Route exact path="/pair/confirm" component={Confirm} />
        <Route
          exact
          path="/pair"
          render={() => <Redirect to="/pair/request" />}
        />
      </div>
    );
  }
}

export default Pair;
