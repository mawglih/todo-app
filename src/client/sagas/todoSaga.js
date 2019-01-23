import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import {
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
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

 export function* getTodoSaga() {
   yield takeEvery(GET_TODOS_START, getTodoStartSaga);
 }

 export default [
   getTodoSaga(),
 ];
