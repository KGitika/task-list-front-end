import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState } from 'react';

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
  // lift state up from task to app to control full task list
  // so we can update them in one place
  const [tasks, setTasks] = useState(TASKS);

  // toggle completed for a task when it's clicked
  const toggleTask = (id) => {
    // create a new array with updated task
    const updatedTasks = tasks.map((task) => {
      // if this = task we're updating toggle isComplete
      if (task.id === id) {
        return { ...task, isComplete: !task.isComplete };
      }
      return task;
    });
    // update state with new task list - triggers re-render with new *data
    setTasks(updatedTasks);
  };

  // delete a task by id, filtering it out of array
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => task.id !== id);
    // update state after removing task - triggers re-render with new *list
    setTasks(remainingTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        {/* Render TaskList component
        pass data (tasks) and actions (toggle/delete) to TaskList as props
        allows childen to request changes to state but doesn't directly chage them */}
        <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      </main>
    </div>
  );
};

export default App;
