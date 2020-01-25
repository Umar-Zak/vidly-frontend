import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getCurrentUser } from "./services/authService";
import Nav from "./Components/Common/NavBar";
import Notfound from "./Components/Notfound";
import Counter from "./Components/Counter";
import Rentals from "./Components/Rentals";
import Customer from "./Components/Customer";
import LoginForm from "./Components/LoginForm";
import Register from "./Components/registerForm";
import AddMovie from "./Components/addMovie";
import Logout from "./Components/logout";
import ProtectedRoute from "./Components/Common/protectedRoute";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <ToastContainer />
        <Nav user={user} />
        <div className="container">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={AddMovie} />
            <Route
              path="/movies"
              render={props => <Counter {...props} user={user} />}
            />
            <Route path="/customers" component={Customer} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={Notfound} />
            <Route
              path="/"
              exact
              render={props => <Counter {...props} user={user} />}
            />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
