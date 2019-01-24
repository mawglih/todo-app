import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cn from 'classnames';
import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

// /**
//  * Prop Types
//  * @private
//  */
// const propTypes = {
//   filtered: PropTypes.bool,
//   onClickDelete: PropTypes.func,
//   onClickTodo: PropTypes.func,
//   status: PropTypes.string,
//   text: PropTypes.string,
// };

// /**
//  * Default Props
//  * @private
//  */
// const defaultProps = {
//   filtered: false,
//   onClickDelete: noop,
//   onClickTodo: noop,
//   status: '',
//   text: '',
// };

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
  render() {
    const {
      filtered,
      onClickDelete,
      onClickTodo,
      status,
      text,
      } = this.props
    const {
      archive,
    } = this.state;
    console.log("todo text: ", text);
    console.log("archive: ", archive);
    /**
     * Base CSS class
     */
    const baseCls = 'todo';

    const todoCls = baseCls
      + (status === 'complete' ? ' todo--status-complete' : '')
      + (filtered ? ' todo--filtered' : '');
    
    // const buttonCls =  archive ? 'archive' : 'display-none';
  

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

        <Button text="x" onClick={onClickDelete} />
      </li>
    );
  }
}
// Todo.propTypes = propTypes;
// Todo.defaultProps = defaultProps;

export default Todo;
