import {
  QUESTIONS,
  CHOICES,
  QUIZ,
  RESET_QUIZ,
  GET_SCORE,
  GET_ALL_SCORE,
  GET_ALL_MISSIONS,
  MISSION_ACOMPLISHED,
  FILLMS,
  MODANC,
  DELANC,
  SETSCORE,
  GOTOS,
  RESETSCORE,
  RESETS,
} from "../actions/types";

const initialState = {
  questions: [],
  choices: [],
  score: null,
  scores: [],
  tom: [],
  miFrachise: [],
  do_quiz: false,
  which: -999,
  Qs: "",
  markingScheme: [],
  ancsGiven: [],
  s: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SCORE:
      return {
        ...state,
        scores: action.payload,
      };
    case SETSCORE:
      return {
        ...state,
        score: action.payload.score,
      };
    case RESETSCORE:
      return {
        ...state,
        score: null,
      };
    case GOTOS:
      return {
        ...state,
        s: true,
      };
    case RESETS:
      return {
        ...state,
        s: false,
      };
    case GET_ALL_MISSIONS:
      return {
        ...state,
        miFrachise: action.payload,
      };
    case DELANC:
      return {
        ...state,
        ancsGiven: [],
      };
    case GET_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    case FILLMS:
      return {
        ...state,
        markingScheme: action.payload,
      };
    case MODANC:
      return {
        ...state,
        ancsGiven: state.ancsGiven.concat(action.payload),
      };
    case QUESTIONS:
      return {
        questions: action.payload,
      };
    case CHOICES:
      return {
        choices: action.payload,
      };
    case QUIZ:
      return {
        ...state,
        do_quiz: true,
        which: action.payload,
      };
    case RESET_QUIZ:
      return {
        ...state,
        do_quiz: false,
      };
    default:
      return state;
  }
}
