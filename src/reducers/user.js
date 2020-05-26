import {
  USER_LOADED,
  CHECK,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/types";
const initialState = {
  user: null,
  checked: false,
  clazie: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
      };
    case CHECK:
      return {
        ...state,
        clazie: action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        checked: true,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        checked: false,
      };
    default:
      return state;
  }
}
