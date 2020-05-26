import axios from "axios";
import { returnErrors } from "./messages";

import {
  USER_LOADED,
  LOGIN_FAIL,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  USER_DETAILS,
  CHECK,
  CHECK_TEACHER,
  TEACHER_DETAILS,
} from "./types";

//CHECK TOKEN & LOAD USER

export const loadUser = () => (dispatch, getState) => {
  //USER LOADING
  const token = getState().auth.token;

  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //if token add to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("http://127.0.0.1:8000/api/auth/user", config)
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const checkTeacherid = (id) => (dispatch, getState) => {
  //USER LOADING
  const token = getState().auth.token;

  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //if token add to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get(`http://127.0.0.1:8000/api/teacher/${id}/`, config)
    .then((res) => {
      dispatch({
        type: CHECK_TEACHER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // .catch((err) => {
  //   dispatch(returnErrors(err.response.data, err.response.status));
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  // });
};
export const allUsers = () => (dispatch, getState) => {
  //USER LOADING
  const token = getState().auth.token;

  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //if token add to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("http://127.0.0.1:8000/api/all/", config)
    .then((res) => {
      dispatch({
        type: CHECK,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
  // .catch((err) => {
  //   dispatch(returnErrors(err.response.data, err.response.status));
  //   dispatch({
  //     type: AUTH_ERROR,
  //   });
  // });
};
//CHECK TOKEN & LOGIN USER

export const login = (email, password) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //GET BODY
  const body = JSON.stringify({ email, password });

  axios
    .post("http://127.0.0.1:8000/api/auth/login", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
export const register = (email, password) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //GET BODY
  const body = JSON.stringify({ email, password });

  axios
    .post("http://127.0.0.1:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

export const addProfile = (deets) => (dispatch, getState) => {
  //USER LOADING
  const token = getState().auth.token;
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  //GET BODY
  const body = JSON.stringify(deets);
  console.log(body);

  axios
    .post("http://127.0.0.1:8000/api/student/", body, config)
    .then((res) => {
      dispatch({
        type: USER_DETAILS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
// export const addTeacher = (deets) => (dispatch, getState) => {
//   //USER LOADING
//   const token = getState().auth.token;
//   //HEADERS
//   const config = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   };
//   if (token) {
//     config.headers["Authorization"] = `Token ${token}`;
//   }

//   //GET BODY
//   const body = JSON.stringify(deets);
//   console.log(body);

//   axios
//     .post("http://127.0.0.1:8000/api/teacher/", body, config)
//     .then((res) => {
//       dispatch({
//         type: USER_DETAILS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: REGISTER_FAIL,
//       });
//     });
// };
export const addTeacher = (deets) => (dispatch, getState) => {
  //USER LOADING
  const token = getState().auth.token;
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  //GET BODY
  const body = JSON.stringify(deets);
  console.log(body);

  axios
    .post("http://127.0.0.1:8000/api/teacher/", body, config)
    .then((res) => {
      dispatch({
        type: TEACHER_DETAILS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
      console.log(err);
    });
};
export const logout = () => (dispatch, getState) => {
  //USER LOADING
  const token = getState().auth.token;

  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //if token add to config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post("http://127.0.0.1:8000/api/auth/logout", null, config)
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};
