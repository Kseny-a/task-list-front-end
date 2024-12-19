import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, description, isComplete, onTaskClickCallback, onTaskDeleteCallback }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const handleClick = () => {
    onTaskClickCallback(id);
  };

  const onUnregisterClick = () => {
    onTaskDeleteCallback(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={handleClick}
      >
        <div className="tasks__item__title">{title}</div>
        <div className='tasks__descr'>
          {description}
        </div>
      </button>
      <button className="tasks__item__remove button"
        onClick={onUnregisterClick}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskClickCallback: PropTypes.func.isRequired,
  onTaskDeleteCallback: PropTypes.func.isRequired,
};

export default Task;
