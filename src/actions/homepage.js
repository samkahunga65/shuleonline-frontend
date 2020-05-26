import axios from "axios";
import {
  QUESTIONS,
  CHOICES,
  QUIZ,
  RESET_QUIZ,
  FINISH_QUIZ,
  GET_SCORE,
  GET_ALL_SCORE,
  GET_ALL_MISSIONS,
  MISSION_ACOMPLISHED,
  ANCWERED,
  ANCWERING,
  FILLMS,
  DELMS,
  MODQ,
  MODANC,
  DELANC,
  SETSCORE,
  RESETSCORE,
  GOTOS,
  RESETS,
} from "./types";
import { returnErrors } from "./messages";

export const questions = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/assignment/")
    .then((res) => {
      dispatch({
        type: QUESTIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const choices = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/choice/")
    .then((res) => {
      dispatch({
        type: CHOICES,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const get_all_score = () => (dispatch, getState) => {
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
    .get(`http://127.0.0.1:8000/api/score/`, config)
    .then((res) => {
      dispatch({
        type: GET_ALL_SCORE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const get_all_missions = () => (dispatch, getState) => {
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
    .get(`http://127.0.0.1:8000/api/mission/`)
    .then((res) => {
      dispatch({
        type: GET_ALL_MISSIONS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const get_score = (id) => (dispatch, getState) => {
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
    .get(`http://127.0.0.1:8000/api/score/${id}/`)
    .then((res) => {
      dispatch({
        type: GET_SCORE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};
export const doQuiz = (index) => (dispatch) => {
  dispatch({ type: QUIZ, payload: index });
};
export const resetQuiz = () => (dispatch) => {
  dispatch({ type: RESET_QUIZ });
};
export const finito = (score) => (dispatch, getState) => {
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
    .get(`http://127.0.0.1:8000/api/score/${score}/`, config)
    .then((res) => {
      dispatch({
        type: FINISH_QUIZ,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const cruise = (ma) => (dispatch, getState) => {
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
  const body = JSON.stringify(ma);

  axios
    .get(`http://127.0.0.1:8000/api/mission/`, body, config)
    .then((res) => {
      dispatch({
        type: MISSION_ACOMPLISHED,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const ancwering = () => (dispatch) => {
  dispatch({ type: ANCWERING });
};
export const ancwered = () => (dispatch) => {
  dispatch({ type: ANCWERED });
};
export const markingScheme = (ms) => (dispatch) => {
  dispatch({ type: FILLMS, payload: ms });
};
export const modAnc = (ms) => (dispatch) => {
  dispatch({ type: MODANC, payload: ms });
};
export const delAnc = () => (dispatch) => {
  dispatch({ type: DELANC });
};
export const goToS = () => (dispatch) => {
  dispatch({ type: GOTOS });
};
export const resetS = () => (dispatch) => {
  dispatch({ type: RESETS });
};
export const resetScore = () => (dispatch) => {
  dispatch({ type: RESETSCORE });
};
export const setScore = (score) => (dispatch, getState) => {
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
  const body = JSON.stringify(score);
  axios
    .post(`http://127.0.0.1:8000/api/score/`, body, config)
    .then((res) => {
      dispatch({
        type: SETSCORE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// export const delms = () = (dispatch) => {

// }
