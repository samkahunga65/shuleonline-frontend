import axios from "axios";
import {
  GET_TEACHERS,
  LOAD_STUDENTS,
  GIVE_WORK,
  CHECK_WORK,
  QUESTION,
  CHOICES,
  FALSE_QUESTION,
  FALSE_ASSIGNMENT,
} from "./types";

export const getteachers = () => (dispatch) => {
  axios
    .get("https://intense-savannah-53065.herokuapp.com/api/teacher/")
    .then((res) => {
      dispatch({
        type: GET_TEACHERS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const sStudents = (cls) => (dispatch, getState) => {
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

  axios
    .get(
      `https://intense-savannah-53065.herokuapp.com/api/studentcls/${cls}/`,
      config
    )
    .then((res) => {
      dispatch({
        type: LOAD_STUDENTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const giveWork = (work) => (dispatch, getState) => {
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
  const body = JSON.stringify(work);

  axios
    .post(
      `https://intense-savannah-53065.herokuapp.com/api/assignment/`,
      body,
      config
    )
    .then((res) => {
      dispatch({
        type: GIVE_WORK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const giveQuestion = (qst) => (dispatch, getState) => {
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
  const body = JSON.stringify(qst);

  axios
    .post(
      `https://intense-savannah-53065.herokuapp.com/api/question/`,
      body,
      config
    )
    .then((res) => {
      dispatch({
        type: QUESTION,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const giveChoices = (cs) => (dispatch, getState) => {
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
  const body = JSON.stringify(cs);

  axios
    .post(
      `https://intense-savannah-53065.herokuapp.com/api/choice/`,
      body,
      config
    )
    .then((res) => {
      dispatch({
        type: CHOICES,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const Work = () => (dispatch, getState) => {
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

  axios
    .get(
      `https://intense-savannah-53065.herokuapp.com/api/allassignments/`,
      config
    )
    .then((res) => {
      dispatch({
        type: CHECK_WORK,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
export const falseQuestion = () => (dispatch) => {
  dispatch({
    type: FALSE_QUESTION,
  });
};
export const falseAssingment = () => (dispatch) => {
  dispatch({
    type: FALSE_ASSIGNMENT,
  });
};
