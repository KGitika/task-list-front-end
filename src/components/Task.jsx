import { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, completeness, deleteTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const toggleCompleteness = () => {
    completeness(id);
  };
  const deleteOneTask = () => {
    deleteTask(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={toggleCompleteness}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={deleteOneTask}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  completeness: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default Task;
