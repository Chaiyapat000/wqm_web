import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { history } from "./history";

// Pages
import Dashboard from "./views/pages/dashboard/Dashboard";
import History from "./views/pages/history/History";
import Control from "./views/pages/control/Control";
import NavigationBar from "./layouts/navs/NavigationBar";
import Register from "./views/pages/register/Register";
import Login from "./views/pages/login/Login";
import Test from "./views/pages/Test";
import User from "./views/pages/user/user";

import { authenticate } from './functions/apiActions'

export default class AppRouter extends React.Component {
  constructor() {
    super();
    this.state = {
      permissions: null,
      loading: true,
      user_data: {},
    };
  }

  componentDidMount() {
    authenticate().then((data) => {
      console.log(data);
      if (data != false) {
        if (data.permissions == "admin") {
          this.setState({
            permissions: ["user", "admin"],
            user_data: data,
            loading: false,
          });
        } else if (data.permissions == "user") {
          this.setState({
            permissions: ["user"],
            user_data: data,
            loading: false,
          });
        }
      } else {
        this.setState({
          permissions: ["anon"],
          loading: false,
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return <></>;
    }
    return (
      <Router history={history}>
        <NavigationBar permissions={this.state.permissions} data={ this.state.user_data }/>
        <div className=" text-dark">
          <Switch>
            {this.state.permissions.includes("user") && (
              <Route path="/history">
                <History />
              </Route>
            )}
            {!this.state.permissions.includes("user") && (
              <Route path="/register">
                <Register />
              </Route>
            )}
            {!this.state.permissions.includes("user") && (
              <Route path="/login">
                <Login />
              </Route>
            )}
            {this.state.permissions.includes("user") && (
              <Route path="/control">
                <Control />
              </Route>
            )}
            {
              // TEST PATH
              !this.state.permissions.includes("user") && (
                <Route path="/test">
                  <Test />
                </Route>
              )
            }
            {this.state.permissions.includes("admin") && (
              <Route path="/usermanage">
                <User />
              </Route>
            )}
            {this.state.permissions.includes("user") ? (
              <Route path="/" component={props => <Dashboard {...props} />}></Route>
            ) : (
              <Route path="/" component={props => <Login {...props} />}></Route>
            )}
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}
