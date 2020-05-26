import React, { Component } from "react";
import "../App.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

export class Nav extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = (
      <ul>
        <Link to="/login">
          <p>login</p>
        </Link>
        <Link to="/register">
          <p>register</p>
        </Link>
      </ul>
    );
    const authLinks = (
      <Link>
        <button onClick={this.props.logout}>Logout</button>
      </Link>
    );
    return (
      <div>
        <div className="Navbar">
          <Link to={{ pathname: "/", state: { flushDeal: true } }}>
            <h1>Shuleonline</h1>
          </Link>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Nav);
