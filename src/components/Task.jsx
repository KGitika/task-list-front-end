import PropTypes from 'prop-types';
import './Task.css';

// include onToggle & onDelete from parent
const Task = ({ id, title, isComplete, onToggle, onDelete }) => {
  // if task complete, style it
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        // when button is clicked call the toggle function from App
        onClick={() => onToggle(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        // when button is clicked call the delete function from App
        onClick={() => onDelete(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
