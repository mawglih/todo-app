export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_START = 'GET_TODOS_START';
export const ADD_TODOS_START = 'ADD_TODOS_START';
export const ADD_TODOS_SUCCESS = 'ADD_TODOS_SUCCESS';

export const getTodosStart = () => {
  return {
    type: GET_TODOS_START,
  };
};

export const getTodosSuccess = ( payload ) => {
  console.log('get todos success action: ', payload);
  return {
    type: GET_TODOS_SUCCESS,
    payload,
  };
};

export const addTodosStart = (payload) => {
  console.log('add todos start action payload: ', typeof(payload));
  return {
    type: ADD_TODOS_START,
    payload,
  };
};

export const addTodosSuccess = ({ payload }) => {
  console.log('add todos success action: ', payload);
  return {
    type: ADD_TODOS_SUCCESS,
    payload,
  };
};