import { useState } from 'react';
import axios from 'axios';
import './NewTaskForm.css';

const NewTaskForm = () => {
  const [task, setTask] = useState({
    description: '',
    id: 0,
    title: ''
  });
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prevTask => ({
      ...prevTask,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', task)
      .then(response => {
        console.log(response);
        alert('Task submitted successfully!');
        setShowForm(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
        alert('Failed to submit task!');
      });
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Hide Form' : 'Add New Task'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="task-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="submit-btn">Submit Task</button>
        </form>
      )}
    </div>
  );
};

export default NewTaskForm;