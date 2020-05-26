import {
  GET_TEACHERS,
  ADD_TEACHER,
  DARASAS,
  CHECK_TEACHER,
  CHECK_WORK,
  QUESTION,
  GIVE_WORK,
} from "../actions/types";

const initialState = {
  teachers: [],
  teacher: "",
  subjects: [],
  darasas: [],
  work: [],
  now_work: { id: 0 },
  now_question: { id: 0 },
  now_choices: { id: 0 },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TEACHERS:
      return {
        ...state,
        teachers: action.payload,
      };
    case ADD_TEACHER:
      return {
        ...state,
        teachers: [...state.teachers, action.payload],
      };
    case CHECK_WORK:
      return {
        ...state,
        work: action.payload,
      };
    case GIVE_WORK:
      return {
        ...state,
        now_work: action.payload,
      };
    case QUESTION:
      return {
        ...state,
        now_question: action.payload,
      };
    case DARASAS:
      return {
        ...state,
        darasas: action.payload,
      };
    case CHECK_TEACHER:
      return {
        ...state,
        teacher: action.payload,
      };
    default:
      return state;
  }
}
