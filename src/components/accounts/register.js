import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
export class Register extends Component {
  state = {
    email: "",
    password: "",
    password2: "",
    user: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.password !== this.state.password2) {
      this.props.createMessage({
        password_do_not_match: "passwords do not match",
      });
      alert("passwords do not match");
    } else {
      this.props.register(this.state.email, this.state.password);
    }
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  render() {
    if (this.props.isAuthenticated) {
      if (this.state.user == 1) {
        return <Redirect to="/profile" />;
      } else {
        return <Redirect to="/teacher" />;
      }
    }
    const { email, password, password2, user } = this.state;
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={this.onChange}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>confirm password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>
            <div className="form-group">
              <label>account type</label>
              <select name="user" onChange={this.onChange} value={user}>
                <option value="" selected="">
                  ---------
                </option>

                <option value="1">student</option>
                <option value="2">teacher</option>
              </select>
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  hasProfile: state.auth.hasProfile,
});
export default connect(mapStateToProps, { register, createMessage })(Register);
