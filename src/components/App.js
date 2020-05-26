import React, { Component, Fragment } from "react";
import "./App.scss";
import { Provider as AlertProvider } from "react-alert";
import { Provider } from "react-redux";
import ReactDom from "react-dom";

import Alerts from "./components/alerts";
import AlertTemplate from "react-alert-template-basic";
import store from "../store";
import Students from "./components/home/studentHome";
import Form from "./components/form";
import form_teacher from "./components/formt";
import Nav from "./components/nav";
import Login from "./components/accounts/login";
import Pfile from "./components/accounts/addProfile";
import Teacher from "./components/accounts/addTeacher";
import TeacherHome from "./components/home/teacherHome";
import PrivateRoute from "./components/common/privateroute";
import Divert from "./components/dashboard";
import Register from "./components/accounts/register";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Question from "./components/desk";
import Doit from "./components/home/doAssignment";

import { loadUser } from "./actions/auth";
//alert options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};
class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Fragment>
            <div className="App">
              <Router>
                <Nav />
                <Alerts />

                <Switch>
                  <PrivateRoute path="/s" exact component={Students} />
                  <PrivateRoute path="/" exact component={Divert} />
                  <PrivateRoute path="/t" exact component={TeacherHome} />
                  <PrivateRoute path="/add_student" exact component={Form} />
                  <PrivateRoute
                    path="/add_teacher"
                    exact
                    component={form_teacher}
                  />
                  <Route path="/" exact component={Students} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/doit" component={Doit} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/profile" component={Pfile} />
                  <Route exact path="/teacher" component={Teacher} />
                  <PrivateRoute exact path="/desk" component={Question} />
                  <Route />
                </Switch>
              </Router>
            </div>
          </Fragment>
        </AlertProvider>
      </Provider>
    );
  }
}
ReactDom.render(<App />, document.getElementById("app"));
