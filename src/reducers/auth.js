import {
  USER_LOADED,
  USER_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  USER_DETAILS,
  AUTH_ERROR,
  TEACHER_DETAILS,
} from "../actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  hasProfile: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        hasProfile: false,
      };
    case USER_DETAILS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        hasProfile: true,
      };
    case TEACHER_DETAILS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        hasProfile: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        token: null,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
