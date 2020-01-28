import React from "react";
import "./App.css";
import PropTypes from "prop-types";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      lastId: -1
    };
    this.toDoInput = React.createRef();
  }

  componentDidMount() {
    this.toDoInput.current.focus();
  }

  toggleComplete = item => {
    let todos = this.state.todos.map(todo => {
      if (todo.id === item.id) {
        todo.complete = !todo.complete;
      }
      return todo;
    });
    this.setState({ todos });
  };

  removeToDo = item => {
    let todos = this.state.todos.filter(todo => todo.id !== item.id);
    this.setState({ todos });
  };

  removeCompleted = () => {
    let todos = this.state.todos.filter(todo => !todo.complete);
    this.setState({ todos });
  };

  hasCompleted = () => {
    let completed = this.state.todos.filter(todo => todo.complete); // only increment completed.length if todo.complete evaluate true
    return completed.length > 0 ? true : false;
  };

  addToDo = event => {
    event.preventDefault();

    let toDoInput = this.toDoInput.current;

    if (toDoInput.value) {
      const id = this.state.lastId + 1;
      const newToDo = [
        ...this.state.todos,
        { id, title: toDoInput.value, complete: false }
      ];
      this.setState({ lastId: id, todos: newToDo });
    }
    this.toDoInput.current.value = ""; // toDoInput.value = ""; works as well
  };
  render() {
    let { todos } = this.state; // deconstruct before return statement.
    let number = todos.length; // optimized b/c the value will be cached on first run to be reused & easier to change
    return (
      // in return you need {} to write javascript
      <div className="todo-list">
        <div className="App">
          <Header title="So Much To Do" />

          <div className="add-todo">
            <form name="addTodo" onSubmit={this.addToDo}>
              <input type="text" ref={this.toDoInput} />
              <span>(press enter to add)</span>
            </form>
          </div>

          <ul>
            {todos.map(todo => {
              return (
                <ToDoList
                  key={todo.id}
                  todo={todo}
                  toggleComplete={() => this.toggleComplete(todo)}
                  removeToDo={() => this.removeToDo(todo)}
                />
              ); /* value of todo prop is todo */
            })}
          </ul>
          <div className="todo-admin">
            <ToDoCount number={number} />
            {this.hasCompleted() && (
              <ClearButton removeCompleted={this.removeCompleted} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
// Header component to display the Header
const Header = ({ title }) => <h1>{title}</h1>;
Header.propTypes = {
  title: PropTypes.string.isRequired
};
Header.defaultProps = {
  title: "HELLO WORLD"
};

const ToDoList = ({ todo, toggleComplete, removeToDo }) => {
  return (
    <li>
      {todo.title}
      <input
        type="checkbox"
        id={todo.id}
        checked={todo.complete}
        onChange={toggleComplete}
      />
      <label htmlFor={todo.id} />
      <button onClick={removeToDo}>
        <i className="fa fa-trash" />
      </button>
    </li>
  );
};

ToDoList.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired
  }).isRequired
};

const ToDoCount = ({ number }) => {
  return <span>{number > 1 ? `Count: ${number}` : "Nothing to do"}</span>;
};
ToDoCount.propTypes = {
  number: PropTypes.number.isRequired
};

const ClearButton = ({ removeCompleted }) => (
  <button onClick={() => removeCompleted()}>Clear Completed</button>
);
ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
};

// this commented section is stateless
// function App() {
//   const todos = [
//     { id: 0, title: "Learn React", complete: false },
//     { id: 1, title: "Learn Meteor", complete: false },
//     { id: 2, title: "Feed the Dog", complete: false },
//     { id: 3, title: "Drink Water", complete: false }
//   ];
//   return (
//     <div className="todo-list">
//       <div className="App">
//         <Header title="So Much To Do" />
//         <ul>
//           {todos.map(todo => {
//             return (
//               <ToDoList key={todo.id} todo={todo} />
//             ); /* value of todo prop is todo */
//           })}
//         </ul>
//         <div className="todo-admin">
//           <ToDoCount number={todos.length} />
//           <ClearButton removeCompleted={() => true} />
//         </div>
//       </div>
//     </div>
//   );
// }
// end of stateless

export default App;
