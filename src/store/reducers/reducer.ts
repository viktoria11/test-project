import {
  DELETE_QUESTION_SUCCESS,
  FETCH_ONE_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
} from '../actions/actions';
import { Question, QuestionsActionTypes } from '../types/actions';

export interface QuestionsState {
  questions: Question[];
  questionLoading: boolean;
  questionError: any;
}

const initialState: QuestionsState = {
  questionLoading: false,
  questionError: null,
  questions: [],
};

const reducer = (
  state = initialState,
  action: QuestionsActionTypes
): QuestionsState => {
  switch (action.type) {
    case FETCH_QUESTION_REQUEST:
      return { ...state, questionLoading: true };
    case FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        questionLoading: false,
        questionError: null,
        questions: action.questions,
      };
    case FETCH_ONE_QUESTION_SUCCESS:
      return {
        ...state,
        questionLoading: false,
        questionError: null,
        questions: [action.question, ...state.questions],
      };
    case UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        questionLoading: false,
        questionError: null,
        ...state.questions.splice(action.i, 1),
        questions: [action.question, ...state.questions],
      };
    case FETCH_QUESTION_FAILURE:
      return { ...state, questionError: action.error, questionLoading: false };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        questionLoading: false,
        questionError: null,
        ...state.questions.splice(action.i, 1),
      };
    default:
      return state;
  }
};

export default reducer;
