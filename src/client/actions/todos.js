export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS';
export const GET_TODOS_START = 'GET_TODOS_START';

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