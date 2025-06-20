import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const kBaseURL='http://127.0.0.1:5000';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${kBaseURL}/tasks`)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error to fetching tasks:', error);
      });
  }, []);

  // Toggle isComplete field of a task
  // const toggleTaskComplete = (id) => {
  //   const updatedTasks = tasks.map((task) => {
  //     if (task.id === id) {
  //       return { ...task, isComplete: !task.isComplete };
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  // };

  const toggleTaskComplete = (id, isComplete) => {
    const endpoint = isComplete
      ? `/tasks/${id}/mark_incomplete`
      : `/tasks/${id}/mark_complete`;

    axios.patch(`${kBaseURL}${endpoint}`)
      .then(() => {
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, isComplete: !isComplete } : task  //(...task) = spreads the current task’s properties into a new object
        );
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error('Error to toggling task:', error);
      });
  };

  // Delete a task
  // const deleteTask = (id) => {
  //   const filteredTasks = tasks.filter((task) => task.id !== id);
  //   setTasks(filteredTasks);
  // };

  const deleteTask = (id) => {
    axios.delete(`${kBaseURL}/tasks/${id}`)
      .then(() => {
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
      })
      .catch((error) => {
        console.error('Error to deleting task:', error);
      });
  };

  const addTask = (taskData) => {
    axios.post(`${kBaseURL}/tasks`, taskData) //taskData already has title, description, is_complete
      .then((response) => {
        const newTask = response.data.task; // Backend returns { task: {...} }
        const newTasks = [...tasks, newTask];
        setTasks(newTasks);  //it  creates a new array that includes all the old tasks plus the new one. (prev is the previous list of tasks.)
      })
      .catch((error) => {
        console.error('Error to creating task:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {<TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskComplete}
            onDeleteTask={deleteTask}
          />}
          <NewTaskForm onAddTask={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;
