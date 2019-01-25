import {
  call,
  put,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';
import {
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  ADD_TODOS_START,
  ADD_TODOS_SUCCESS,
} from '../actions/todos';
 import axios from 'axios';

 const URL = 'http://localhost:3000/todos';

 export function* getTodoStartSaga() {
   try {
     const {
       data,
       status,
     } = yield call(axios, {
       method: 'get',
       url: URL,
     });
     if (status >=200 && status < 300) {
      yield console.log('todos: ', data);
      yield put({
        type: GET_TODOS_SUCCESS,
        payload: data,
      });
     } else {
       throw data;
     }
   } catch (err) {
     yield console.log('todo saga error: ', err);
   }
 }
 export function* addTodoStartSaga({payload}) {
   const {
     text,
   } = payload
  try {
    const {
      data,
      status,
    } = yield call(axios, {
      data: {
        text,
      },
      method: 'post',
      url: URL,
    });
    if (status ===201) {
     yield console.log('todos: ', data);
     yield put({
       type: ADD_TODOS_SUCCESS,
       payload: data,
     });
    } else {
      throw data;
    }
  } catch (err) {
    yield console.log('todo saga error: ', err);
  }
}

 export function* getTodoSaga() {
   yield takeEvery(GET_TODOS_START, getTodoStartSaga);
   yield takeLatest(ADD_TODOS_START, addTodoStartSaga);
 }

 export default [
   getTodoSaga(),
 ];
