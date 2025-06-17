import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

// update props to take in onToggle & onDelete funcs
const TaskList = ({ tasks, onToggle, onDelete }) => {
  // turns each task into a Task component - renders
  const getTaskListJSX = (tasks) => {
    return tasks.map((task) => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          // pass down funcs from App
          onToggle={onToggle}
          onDelete={onDelete}
        />
      );
    });
  };
  // renter full task list as ul
  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskList;
