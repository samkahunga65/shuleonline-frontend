import axios from "axios";
import { GET_STUDENTS, DEL_STUDENT, ADD_STUDENT, GET_STUDENT } from "./types";
import { returnErrors } from "./messages";

//get students

export const getstudents = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/student/")
    .then((res) => {
      dispatch({
        type: GET_STUDENTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getstudent = (id) => (dispatch, getState) => {
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

  axios
    .get(`http://127.0.0.1:8000/api/studentme/${id}/`, config)
    .then((res) => {
      dispatch({
        type: GET_STUDENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

//delete students

export const delstudents = (id) => (dispatch) => {
  axios
    .delete(`http://127.0.0.1:8000/api/student/${id}/`)
    .then((res) => {
      dispatch({
        type: DEL_STUDENT,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
//add students

export const addstudent = (student) => (dispatch) => {
  axios
    .post(`http://127.0.0.1:8000/api/student/`, student)
    .then((res) => {
      dispatch({
        type: ADD_STUDENT,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
