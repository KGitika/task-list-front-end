import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList.jsx';
import './App.css';

// save base URL of our local host
const kBaseURL='http://127.0.0.1:5000';

// call API to get all the tasks
const getTasksViaApi = () => {
  return axios.get(`${kBaseURL}/tasks`)
    .then(response => {
      return response.data;
    })
    .catch (error => {
      console.log(error);
      throw new Error('Unable to fetch tasks');
    });
};

// call API to delete a task by id
const deleteTaskViaApi = (taskId) => {
  return axios.delete(`${kBaseURL}/tasks/${taskId}`)
    .then(response => {
      console.log(response);
    })
    .catch (error => {
      console.log(error);
      throw new Error('Unable to delete task');
    });
};

// call API to toggle completeness
const toggleCompleteViaApi = (taskId, markState) => {
  return axios.patch(`${kBaseURL}/tasks/${taskId}/${markState}`)
    .then(response => {
      console.log(response);
    })
    .catch (error => {
      console.log(error);
      throw new Error(`Unable to mark task ${markState}`);
    });
};

// App component
const App = () => {
  const [tasks, setTasks] = useState([]);

  // get all the tasks
  useEffect(() => {
    console.log('we are inside use effect');
    getTasksViaApi()
      .then(data => {setTasks(data);})
      .catch(error => {console.log('Erorr fetching tasks:', error);});
  }, []);

  // delete task by id
  const deleteTask = (taskId) => {
    deleteTaskViaApi(taskId)
      .then(() => {return getTasksViaApi()})
      .then(data => {setTasks(data)})
      .catch(error => {console.log('can not delete task', error)});
  };

  // toggle complete
  const toggleCompleteness = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    if (!taskToUpdate) {
      return;
    }
    // choose endpoint depending on current state
    const endPoint = !taskToUpdate.is_complete ? 'mark_complete' : 'mark_incomplete';
    toggleCompleteViaApi(taskId, endPoint)
      .then(() => {
        return getTasksViaApi();
      })
      .then(data => {
        setTasks(data);
      })
      .catch(error => {
        console.log('Failed to toggle completeness:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div><TaskList tasks={tasks} completeness={toggleCompleteness} deleteTask={deleteTask} /></div>
      </main>
    </div>
  );
};

export default App;
