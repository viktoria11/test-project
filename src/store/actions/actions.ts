import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axiosApi from '../../axiosApi';
import {
  FetchQuestionRequest,
  Question,
  FetchQuestionSuccess,
  FetchQuestionError,
  FetchOneQuestionSuccess,
  UpdateQuestionSuccess,
  DeleteQuestionSuccess,
} from '../types/actions';

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const FETCH_QUESTION_FAILURE = 'FETCH_QUESTION_FAILURE';

export const FETCH_ONE_QUESTION_SUCCESS = 'FETCH_ONE_QUESTION_SUCCESS';
export const UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS';
export const DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS';

export const fetchQuestionRequest = (): FetchQuestionRequest => ({
  type: FETCH_QUESTION_REQUEST,
});

export const fetchQuestionSuccess = (
  questions: Question[]
): FetchQuestionSuccess => ({
  type: FETCH_QUESTION_SUCCESS,
  questions,
});

export const fetchQuestionFailure = (error: any): FetchQuestionError => ({
  type: FETCH_QUESTION_FAILURE,
  error,
});

export const fetchOneQuestionSuccess = (
  question: Question
): FetchOneQuestionSuccess => ({
  type: FETCH_ONE_QUESTION_SUCCESS,
  question,
});

export const updateQuestionSuccess = (
  i: any,
  question: Question
): UpdateQuestionSuccess => ({
  type: UPDATE_QUESTION_SUCCESS,
  i,
  question,
});

export const deleteQuestionSuccess = (i: number): DeleteQuestionSuccess => ({
  type: DELETE_QUESTION_SUCCESS,
  i,
});

export const fetchQuestions = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(fetchQuestionRequest());
      const response = await axiosApi.get(
        '/api.php?amount=10&category=21&difficulty=medium&type=multiple'
      );
      dispatch(fetchQuestionSuccess(response.data.results));
    } catch (error) {
      if (error.response) {
        dispatch(fetchQuestionFailure(error.response.data));
      } else {
        dispatch(
          fetchQuestionFailure({ global: 'Network error or no internet' })
        );
      }
    }
  };
};

export const fetchOneQuestion = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(fetchQuestionRequest());
      const response = await axiosApi.get(
        '/api.php?amount=1&category=21&difficulty=medium&type=multiple'
      );
      dispatch(fetchOneQuestionSuccess(response.data.results[0]));
    } catch (error) {
      if (error.response) {
        dispatch(fetchQuestionFailure(error.response.data));
      } else {
        dispatch(
          fetchQuestionFailure({ global: 'Network error or no internet' })
        );
      }
    }
  };
};

export const deleteQuestion = (i: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(fetchQuestionRequest());
      dispatch(deleteQuestionSuccess(i));
    } catch (error) {
      if (error.response) {
        dispatch(fetchQuestionFailure(error.response.data));
      } else {
        dispatch(
          fetchQuestionFailure({ global: 'Network error or no internet' })
        );
      }
    }
  };
};

export const updateQuestion = (i: string, question: Question) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(updateQuestionSuccess(i, question));
    } catch (error) {
      console.log(error);
    }
  };
};
