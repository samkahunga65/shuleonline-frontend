import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../App.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addProfile, loadUser } from "../../actions/auth";

export class Profile extends Component {
  state = {
    fname: "",
    lname: "",
    age: "",
    darasa: "",
    phone_number: "",
    owner: "",
  };
  static propTypes = {
    addProfile: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, age, darasa, phone_number, owner } = this.state;

    this.props.loadUser();
    const deets = {
      fname,
      lname,
      age,
      phone_number,
      darasa,
      owner,
    };

    this.props.addProfile(deets);
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { fname, lname, age, darasa, phone_number, owner } = this.state;
    this.state.owner = this.props.user;

    if (this.props.hasProfile) {
      return <Redirect to="/" />;
    }
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Student</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>first name</label>
            <input
              className="form-control"
              type="text"
              name="fname"
              onChange={this.onChange}
              value={fname}
            />
          </div>
          <div className="form-group">
            <label>last name</label>
            <input
              className="form-control"
              type="text"
              name="lname"
              onChange={this.onChange}
              value={lname}
            />
          </div>
          <div className="form-group">
            <label>age</label>
            <input
              className="form-control"
              type="number"
              name="age"
              onChange={this.onChange}
              value={age}
            />
          </div>
          <div className="form-group">
            <label>phone number</label>
            <input
              className="form-control"
              type="text"
              name="phone_number"
              onChange={this.onChange}
              value={phone_number}
            />
          </div>
          <div className="form-group">
            <label>class</label>
            <select name="darasa" onChange={this.onChange} value={darasa}>
              <option value="" selected="">
                ---------
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  hasProfile: state.auth.hasProfile,
  user: state.auth.user.id,
});

export default connect(mapStateToProps, { addProfile, loadUser })(Profile);
