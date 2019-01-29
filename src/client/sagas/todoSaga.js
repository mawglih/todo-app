import {
  call,
  put,
  takeEvery,
  takeLatest,
  fork,
} from 'redux-saga/effects';
import {
  GET_TODOS_START,
  GET_TODOS_SUCCESS,
  ADD_TODOS_START,
  ADD_TODOS_SUCCESS,
  DELETE_TODOS_START,
  DELETE_TODOS_SUCCESS,
} from '../actions/todos';
 import axios from 'axios';


 const URL = 'http://localhost:3000/todos/';

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

export function* deleteTodosStartSaga({payload: id}) {
  console.log('to delete id is: ', id);
 try {
   const {
     data,
     status,
   } = yield call(axios, {
     method: 'delete',
     url: URL + id,
   });
   if (status ===201) {
    yield console.log('delete todos: ', data);
    yield put({
      type: DELETE_TODOS_SUCCESS,
      payload: data,
    });
   } else {
     throw data;
   }
 } catch (err) {
   yield console.log('delete todo saga error: ', err);
 }
}

 export function* getTodoSaga() {
   yield takeEvery(GET_TODOS_START, getTodoStartSaga);
   yield takeLatest(ADD_TODOS_START, addTodoStartSaga);
   yield takeEvery(DELETE_TODOS_START, deleteTodosStartSaga);
 }

 export default [
   getTodoSaga(),
 ];
