import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addstudent } from "../actions/student";

export class Form extends Component {
  state = {
    fname: "",
    lname: "",
    age: "",
    darasa: "",
    phone_number: "",
  };
  static propTypes = {
    addstudent: PropTypes.func.isRequired,
  };
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, age, darasa, phone_number } = this.state;
    const student = {
      fname,
      lname,
      age,
      phone_number,
      darasa: { darasa: darasa },
    };
    this.props.addstudent(student);
  };
  render() {
    const { fname, lname, age, darasa, phone_number } = this.state;
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
              type="number"
              name="phone_number"
              onChange={this.onChange}
              value={phone_number}
            />
          </div>
          <div className="form-group">
            <label>class</label>
            <input
              className="form-control"
              type="number"
              name="darasa"
              onChange={this.onChange}
              value={darasa}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Sabmit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { addstudent })(Form);
