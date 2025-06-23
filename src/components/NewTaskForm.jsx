import { useState } from 'react';
import PropTypes from 'prop-types';


// NEW_TASK object with empty fields. It’s used to initialize and reset the form.
const NEW_TASK = {
  title: '',
  description: '',
};

const NewTaskForm = ({ onAddTask }) =>{
  const [taskData, setTaskData] = useState(NEW_TASK);

  const handleSubmit = (e) => {
    e.preventDefault();  // prevent page refresh

    onAddTask(taskData);  // call parent’s function to create the task
    console.log('Submitting task data:', taskData);
    setTaskData(NEW_TASK);  // clear the input field
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value});  //Every time we type, it updates the taskData
  };

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor='add-task'>Add New Task here: </label>
      <div>
        <input
          id='add-task'
          name='title'
          type="text"
          onChange={handleChange}
          value={taskData.title}
          placeholder="Enter task title"
        />
      </div>
      <div>
        <input
          id="add-description"
          name="description"
          type="text"
          onChange={handleChange}
          value={taskData.description}
          placeholder="Enter task description"
        />
      </div>
      <input
        type="submit"
        value="Add Task"
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;