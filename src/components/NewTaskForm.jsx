import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewTaskForm.css';

const NEW_TASK = { // default state for a new task (empty title and description)
  title: '',
  description: '',
};

const NewTaskForm = ({ onAddTask }) => {
  // track state of the form fields (title and description)
  const [taskData, setTaskData] = useState(NEW_TASK);

  // handles form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page refresh on form submission

    onAddTask(taskData);  // call parent’s function (passed via props) to add the new task
    console.log('Submitting task data:', taskData); // log submitted task for debugging purposes
    setTaskData(NEW_TASK);  // reset form fields to initial empty values
  };

  // handles typing in input fields
  const handleChange = (e) => {
    // update the corresponding field (title or description) based on input's "name" attribute
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="add-task">Add New Task here:</label>
          <input
            id="add-task"
            name="title"
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
    </div>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired, // make sure the parent passes in a function
};

export default NewTaskForm;