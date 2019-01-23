import {
  GET_TODOS_SUCCESS,
} from '../actions/todos';

const INITIAL_STATE = {
  todos: [],
  loading: true,
}

const GetTodosReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch(type) {
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default GetTodosReducer;