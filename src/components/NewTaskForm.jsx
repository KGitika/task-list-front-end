import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onPostTask }) => {
  // set up local state to track task title input
  // current text in input | updates value when user types in
  const [title, setTitle] = useState('');
  // WAVE 6
  // const [formData, setformData] = useState(kdefaultFormState);

  // called when form is submitted
  // event - browser behavior from submit
  const handleSubmit = (event) => {
    // stop the page from default refresh
    event.preventDefault();

    // build a new task object w current title value from form
    const newTask = {
      title: title, // backend expects a title key
      description: '', // optional, empty for now
    };

    // pass the newTask object to app
    // triggers POST req & updates the task list in app
    onPostTask(newTask);

    // clears form - ready for a new input(optional)
    setTitle('');
  };

  // updates title state every time user types input
  const handleChange = (event) => {
    setTitle(event.target.value); // actual text typed in
  };

  // shows text box & button to add new task
  // button clicked -> handleSubmit runs
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="input-title">Task Title: </label>
        <input
          type="text"
          id="input-title"
          name="title"
          // shows current title value in the input
          value={title}
          // updates title state when user types new
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit" className="form-button">
          Add Task
        </button>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  onPostTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
