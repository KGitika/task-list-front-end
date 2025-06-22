import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css'; // Styling
import { useEffect, useState } from 'react'; // React hooks
import axios from 'axios'; // HTTP client to make API requests

const kBaseURL = 'http://127.0.0.1:5000/tasks'; // Base URL for the backend API

const App = () => {
  const [tasks, setTasks] = useState([]); // State to store the list of tasks

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    axios.get(`${kBaseURL}`)
      .then((response) => {
        setTasks(response.data); // Set tasks in state from API response
      })
      .catch((error) => {
        console.error('Error to fetching tasks:', error); // Log error if request fails
      });
  }, []); // Empty dependency array = run once on mount

  // Toggle task completion status
  const toggleTaskComplete = (id, isComplete) => {
    const endpoint = isComplete
      ? `/${id}/mark_incomplete` // If task is complete, use mark it incomplete endpoint
      : `/${id}/mark_complete`; // If task is incomplete, use mark it complete endpoint

    axios.patch(`${kBaseURL}${endpoint}`)
      .then(() => {
        // Update task list in state by flipping the isComplete value for this task
        const updatedTasks = tasks.map((task) =>
          task.id === id ? { ...task, isComplete: !isComplete } : task // Copy task and update its completion status
        );
        setTasks(updatedTasks); // Save updated task list to state
      })
      .catch((error) => {
        console.error('Error to toggling task:', error); // Log error
      });
  };

  // Delete a task
  const deleteTask = (id) => {
    axios.delete(`${kBaseURL}/${id}`)
      .then(() => {
        // Remove the deleted task from state
        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks); // Update state
      })
      .catch((error) => {
        console.error('Error to deleting task:', error); // Log error
      });
  };

  // Add a new task
  const addTask = (taskData) => {
    axios.post(`${kBaseURL}`, taskData) // Send new task data to backend
      .then((response) => {
        const newTask = response.data.task; // Extract new task from backend response
        const newTasks = [...tasks, newTask]; // Add it to the existing list
        setTasks(newTasks); // Update state with the new list
      })
      .catch((error) => {
        console.error('Error to creating task:', error); // Log error
      });
  };

  // Render the app
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {/* Show task list and pass handlers for toggling and deleting */}
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskComplete}
            onDeleteTask={deleteTask}
          />
          {/* Show task form and pass handler for adding new tasks */}
          <NewTaskForm onAddTask={addTask} />
        </div>
      </main>
    </div>
  );
};

export default App;