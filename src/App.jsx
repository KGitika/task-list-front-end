import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const kBaseURL = 'http://127.0.0.1:5000';

// converts backend task data to front end, right after fetching - rename
// is_complete = raw backend JSON
const convertTaskFromApi = (apiTask) => {
  const { id, title, is_complete: isComplete, description } = apiTask;
  return { id, title, isComplete, description };
};

const App = () => {
  // lift state up from task to app to control full task list
  // so we can update them in one place
  // wave 4 - initialize tasks as empty
  const [tasks, setTasks] = useState([]);

  //  when app first loads, get the list of tasks from backend - GET
  useEffect(() => {
    axios
      .get(`${kBaseURL}/tasks`)
      .then((response) => {
        // convert each backend task to frontend format
        const converted = response.data.map(convertTaskFromApi);
        // save in state so app can show them
        setTasks(converted);
      })
      .catch((error) => {
        // if request fails, show error in console
        console.error('Error fetching tasks:', error);
      });
  }, []);

  // changes task’s completed status when toggled
  // sends PATCH request to update status
  // then updates local task list with new status after backend confirm
  const toggleTask = (id, isComplete) => {
    const endpoint = isComplete
      ? `/tasks/${id}/mark_incomplete`
      : `/tasks/${id}/mark_complete`;

    // PATCH
    axios
      .patch(`${kBaseURL}${endpoint}`)
      .then(() => {
        // if backend update works,
        // update the task in local state for new task status
        // map thru current tasks to create new updated array
        setTasks((tasks) =>
          tasks.map((task) =>
            // find the task that matches the id of the toggled task
            // if it's the matching task, create a new object with the toggled isComplete value
            // if not, keep the task unchanged
            task.id === id ? { ...task, isComplete: !isComplete } : task
          )
        );
      })
      .catch((error) => {
        // if request fails, show error in console
        console.error('Error toggling task:', error);
      });
  };

  // deletes a task from backend by id and then removes it from the app list
  // DELETE - disapears from screen
  const deleteTask = (id) => {
    axios
      .delete(`${kBaseURL}/tasks/${id}`)
      .then(() => {
        // once backend confirms it's deleted,
        // update local state by keeping every task EXCEPT the deleted
        setTasks((tasks) => tasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  // WAVE 5: ADD NEW TASK TO BACKEND AND STATE
  // add new task by sending POST req
  // called when NewTaskForm submits new task data
  const postTask = (newTaskData) => {
    // send POST request to the backend with title + description
    axios
      .post(`${kBaseURL}/tasks`, newTaskData)
      .then((response) => {
        // convert backend task response to frontend format
        const newTask = convertTaskFromApi(response.data);

        // add new task to the top (first) of current task list
        setTasks((prevTasks) => [newTask, ...prevTasks]);
      })
      .catch((error) => {
        console.error('Error posting new task:', error);
      });
  };

  // wave 3
  // // toggle completed for a task when it's clicked
  // const toggleTask = (id) => {
  //   // create a new array with updated task
  //   const updatedTasks = tasks.map((task) => {
  //     // if this = task we're updating toggle isComplete
  //     if (task.id === id) {
  //       return { ...task, isComplete: !task.isComplete };
  //     }
  //     return task;
  //   });
  //   // update state with new task list - triggers re-render with new *data
  //   setTasks(updatedTasks);
  // };

  // // delete a task by id, filtering it out of array
  // const deleteTask = (id) => {
  //   const remainingTasks = tasks.filter((task) => task.id !== id);
  //   // update state after removing task - triggers re-render with new *list
  //   setTasks(remainingTasks);
  // };

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
        {/* Pass postTask func to NewTaskForm so it can add new task data to app */}
        <NewTaskForm onPostTask={postTask} />
      </main>
    </div>
  );
};

export default App;
