import { Component } from "react";
import { logOut } from "./../services/authService";

class Logout extends Component {
  componentDidMount() {
    logOut();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default Logout;
