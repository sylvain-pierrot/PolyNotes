// import logo from './logo.svg';
import './App.css';
import TaskList from './components/TaskList';
import WindowSize from './components/WindowSize'

function App() {
  return (
    <div>
      <h1>TodoList - test</h1>
      <TaskList name="Todo" />
      <TaskList name="WIP" />
      <WindowSize />
    </div>
  );
}

export default App;
