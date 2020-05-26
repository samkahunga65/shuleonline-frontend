import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import Proptypes from "prop-types";
export class Alerts extends Component {
  static propTypes = {
    error: Proptypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    const { error, alert } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.email) alert.error(error.msg.email.join());
      if (error.msg.password_do_not_match)
        alert.error(error.msg.password_do_not_match.join());
      if (error.msg.fname) alert.error(`first name:${error.msg.fname.join()}`);
      if (error.msg.lname) alert.error(`last name:${error.msg.lname.join()}`);
      if (error.msg.phone_number)
        alert.error(`number:${error.msg.phone_number.join()}`);
      if (error.msg.age) alert.error(`age:${error.msg.age.join()}`);
      if (error.msg.darasa) alert.error(`class:${error.msg.darasa.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
    }
  }
  render() {
    return <Fragment />;
  }
}
const mapStateToProps = (state) => ({
  error: state.errors,
});
export default connect(mapStateToProps)(withAlert()(Alerts));
