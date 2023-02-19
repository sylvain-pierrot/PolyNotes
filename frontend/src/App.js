// import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import WindowSize from './components/WindowSize'

function App() {
  return (
    <div>
      <h1>TodoList - if i here it's because CI/CD is OK!!</h1>
      <TaskList name="Todo" />
      <TaskList name="WIP" />
      <WindowSize />
    </div>
  );
}

export default App;
