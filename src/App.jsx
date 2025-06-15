import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
];

const App = () => {
  const [tasks, setTasks] = useState(TASKS);
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const toggleCompleteness = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {...task, isComplete: !task.isComplete};
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} completeness={toggleCompleteness} deleteTask={deleteTask} />}</div>
      </main>
    </div>
  );
};

export default App;
