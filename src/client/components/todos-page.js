import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getTodosStart } from '../actions/todos';
// import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: null,
      archive: false,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    // api('GET', null, this.updateTodos);
    const {
      getTodosStart: dispatchTodos,
    } = this.props;
    dispatchTodos();
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState && prevState.todos !== todos)
  //   this.setState({ todos });
  // }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  onCheck = e => {
    e.preventDefault();
    console.log('check clicked');
    // if(e.input.value === 'checked') {
    //   this.setState({
    //     archive: true,
    //   });
    // }
    // this.setState({
    //   archive: false,
    // });
  }
  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const {
      todos: {
        todos,
      } = {},
    } = this.props;
    const {
      filterBy,
      archive,
    } = this.state;
    console.log('redux todos: ', typeof(todos));
    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} />
        <div className="container">
          <div>
            <span>{`${todos.length} todos in the list`}</span>
          </div>
          <TodoForm onSubmit={this.addTodo} />
          <Todos
            filterBy={filterBy}
            todos={todos}
            updateTodos={this.updateTodos}
            onCheck={this.onCheck}
            archive={archive}
          />
        </div>

      </div>
    );
  }
}

export default connect(({todos}) => ({todos}), { getTodosStart })(TodosPage);
