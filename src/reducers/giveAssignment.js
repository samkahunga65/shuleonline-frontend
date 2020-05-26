import {
  QUESTION,
  GIVE_WORK,
  CHOICES,
  FALSE_ASSIGNMENT,
  FALSE_QUESTION,
} from "../actions/types";
const initialState = {
  assignment: "",
  question: "",
  new_assignment: false,
  got_question: false,
  got_assignment: false,
  got_choices: false,
  new_question: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GIVE_WORK:
      return {
        ...state,
        got_assignment: true,
      };
    case QUESTION:
      return {
        ...state,
        got_question: true,
      };
    case CHOICES:
      return {
        ...state,
        new_question: true,
      };
    case FALSE_ASSIGNMENT:
      return {
        ...state,
        got_assignment: false,
      };
    case FALSE_QUESTION:
      return {
        ...state,
        got_question: false,
      };
    default:
      return state;
  }
}
