import {
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_FAILURE,
  FETCH_ONE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
  DELETE_QUESTION_SUCCESS,
} from '../actions/actions';

export interface Question {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface FetchQuestionRequest {
  type: typeof FETCH_QUESTION_REQUEST;
}

export interface FetchQuestionSuccess {
  type: typeof FETCH_QUESTION_SUCCESS;
  questions: Question[];
}

export interface FetchQuestionError {
  type: typeof FETCH_QUESTION_FAILURE;
  error: Error;
}

export interface FetchOneQuestionSuccess {
  type: typeof FETCH_ONE_QUESTION_SUCCESS;
  question: Question;
}

export interface UpdateQuestionSuccess {
  type: typeof UPDATE_QUESTION_SUCCESS;
  question: Question;
  i: number;
}

export interface DeleteQuestionSuccess {
  type: typeof DELETE_QUESTION_SUCCESS;
  i: number;
}

export interface DeleteQuestionSuccess {
  type: typeof DELETE_QUESTION_SUCCESS;
  i: number;
}

export type QuestionsActionTypes =
  | FetchQuestionRequest
  | FetchQuestionSuccess
  | FetchQuestionError
  | FetchOneQuestionSuccess
  | UpdateQuestionSuccess
  | DeleteQuestionSuccess
  | DeleteQuestionSuccess;
