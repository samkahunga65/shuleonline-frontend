import { combineReducers } from "redux";
import students from "./students";
import teachers from "./teacher";
import errors from "./errors";
import auth from "./auth";
import user from "./user";
import homepage from "./homepage";
import assignment from "./giveAssignment";
export default combineReducers({
  students,
  teachers,
  errors,
  auth,
  user,
  homepage,
  assignment,
});
