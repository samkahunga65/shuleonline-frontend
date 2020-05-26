import {
  GET_STUDENTS,
  GET_STUDENT,
  ADD_STUDENT,
  DEL_STUDENT,
  LOAD_STUDENTS,
} from "../actions/types";

const initialState = {
  students: [],
  me: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case GET_STUDENT:
      return {
        ...state,
        me: action.payload,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      };
    case LOAD_STUDENTS:
      return {
        ...state,
        students: action.payload,
      };
    case DEL_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (student) => student.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
