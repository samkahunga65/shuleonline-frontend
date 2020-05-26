import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { allUsers, checkTeacherid } from "../actions/auth";
import { Work } from "../actions/teacher";
import { getstudent } from "../actions/student";
export class Divert extends Component {
  componentDidMount() {
    this.props.allUsers();
    this.props.Work();
  }
  render() {
    let s = 0;
    let t = 0;
    this.props.clazie.map((us) => {
      if (us.owner === this.props.user) {
        if (us.subjects) {
          console.log(us);
          t = 1;
        } else {
          console.log(`student${us}`);
          s = 1;
        }
      }
    });
    console.log(`s${s} t${t}`);

    if (s < t) {
      return <Redirect to="/t" />;
    }
    if (s > t) {
      this.props.getstudent();
      this.props.Work();
      return <Redirect to="/s" />;
    }
    s = 0;
    t = 0;
    this.props.checkTeacherid(this.props.user);
    return <div></div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user.id,
  clazie: state.user.clazie,
});
export default connect(mapStateToProps, {
  allUsers,
  checkTeacherid,
  Work,
  getstudent,
})(Divert);
