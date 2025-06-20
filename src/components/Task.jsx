
import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onToggleComplete, onDeleteTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => onToggleComplete(id, isComplete)}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={() => onDeleteTask(id)}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default Task;
