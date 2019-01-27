import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import Button from './button';
import TodoLink from './todo-link';
import { deleteTodosStart } from '../actions/todos';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickTodo: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
class Todo extends Component {
  state = {
    archive: false
  }
  onCheck = (e) => {
    console.log('e', e.target.checked);
    if(e.target.checked) {
      this.setState({
        archive: true,
      });
    } else {
      this.setState({
        archive: false,
      });
    }
  }
  deleteTodo = (id) => {
    const {
      deleteTodosStart: dispatchDelete,
    } = this.props;
    dispatchDelete(id);
  }

  render() {
    const {
      filtered,
      onClickTodo,
      status,
      text,
      _id,
      } = this.props
    const {
      archive,
    } = this.state;
    /**
     * Base CSS class
     */
    const baseCls = 'todo';

    const todoCls = baseCls
      + (status === 'complete' ? ' todo--status-complete' : '')
      + (filtered ? ' todo--filtered' : '');

    return (
      <li className={todoCls}>
        <input
          type="checkbox"
          onChange={e => this.onCheck(e)}
          value={text}
        />

        <TodoLink text={text} onClick={onClickTodo} />
        <button className={cn(
          archive ? 'archive' : 'display-none'
        )}>Archive</button>
        <button onClick={() => this.deleteTodo(_id)}>x</button>
      </li>
    );
  }
}
Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default connect(null, { deleteTodosStart })(Todo);
