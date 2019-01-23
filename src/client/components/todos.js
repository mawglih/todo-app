// import PropTypes from 'prop-types';
import React from 'react';

// import { api } from '../helpers/api';
import Todo from './todo';

// /**
//  * Prop Types
//  * @private
//  */
// const propTypes = {
//   filterBy: PropTypes.string,
//   // todos: PropTypes.arrayOf(PropTypes.object),
//   updateTodos: PropTypes.func,
// };

// /**
//  * Default Props
//  * @private
//  */
// const defaultProps = {
//   filterBy: '',
//   todos: [],
//   updateTodos: {},
// };

// /**
//  * Todos component
//  * @returns {ReactElement}
//  */
const baseCls = 'todos';


 const Todos = ({
   todos,
   filterBy,
   updateTodos,
 }) => {
  console.log('todos in todos: ', todos);
  return (
    <ul className={baseCls}>
      {todos.map(todo => (
        <Todo
          key={todo.id}
          status={todo.status}
          text={todo.text}
        />
        ))}
    </ul>
    );
}
 export default Todos;