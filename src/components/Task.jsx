import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onClickTask, onUnregisterTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const handleClick = () => {
    onClickTask(id);
  };

  const onUnregisterClick = () => {
    onUnregisterTask(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleClick}
      >
        {title}
      </button>
      <button className="tasks__item__remove button"
      onClick={onUnregisterClick}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onClickTask: PropTypes.func.isRequired,
  onUnregisterTask: PropTypes.func.isRequired,
};

export default Task;
