import { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NEW_TASK = {
  title: '',
  description: '',
};

const NewTaskForm = ({ addTaskCallback }) => {
  const [taskData, setTaskData] = useState(NEW_TASK);

  const submitTaskData = (e) => {
    e.preventDefault();

    addTaskCallback(taskData);
    console.log('Submitting task data:', taskData);
    setTaskData(NEW_TASK);
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form className='form' onSubmit={submitTaskData}>
        <label htmlFor='add-task'>Add New Task here: </label>
        <input id='add-task' name='title' type='text' onChange={handleChange} value={taskData.title}></input>
        <button type='submit'>Add Task</button>
      </form>
    </div>
  );
};

NewTaskForm.propTypes = {
  addTaskCallback: PropTypes.func.isRequired,
};

export default NewTaskForm;