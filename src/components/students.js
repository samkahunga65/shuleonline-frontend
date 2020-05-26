import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { questions, choices } from "../actions/homepage";
import { allUsers } from "../actions/auth";

export class Students extends Component {
  static propTypes = {
    Questions: PropTypes.array,
    questions: PropTypes.func.isRequired,
    Choices: PropTypes.array,
    choices: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.questions();
    this.props.allUsers();
  }

  render() {
    return (
      <div>
        <h1>Student Homes</h1>
        {this.props.Questions.map((q) => (
          <p>{q.question}</p>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  Questions: state.homepage.questions,
  Choices: state.homepage.choices,
});

export default connect(mapStateToProps, { questions, choices, allUsers })(
  Students
);
