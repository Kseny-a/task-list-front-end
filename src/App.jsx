import { useEffect, useState } from 'react';
import TaskList from './components/TaskList.jsx';
import TaskForm from './components/NewTaskForm';
import './App.css';
import axios from 'axios';

const App = () => {
  const [tasksData, setTasks] = useState([]);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then(tasks => setTasks(tasks.data))
      .catch(err => console.error('Failed to fetch tasks', err));
  };

  const addTask = (newTask) => {
    axios.post('http://localhost:5000/tasks', newTask)
      .then(() => fetchTasks())  // Refresh the list after adding a new task
      .catch(err => console.error('Failed to add task', err));
  };

  const markTaskComplete = taskId => {
    axios.patch(`http://localhost:5000/tasks/${taskId}/mark_complete`)
      .then(fetchTasks);
  };

  const markTaskIncomplete = taskId => {
    axios.patch(`http://localhost:5000/tasks/${taskId}/mark_incomplete`)
      .then(fetchTasks);
  };

  const unregisterTask = taskId => {
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
      .then(fetchTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCompleteTask = id => {
    const task = tasksData.find(task => task.id === id);
    if (task && task.is_complete) {
      markTaskIncomplete(id);
    } else {
      markTaskComplete(id);
    }
  };

  const handleUnregisterTask = id => {
    unregisterTask(id);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&#39;s Task List</h1>
      </header>
      <main>
        <TaskForm onAddTask={addTask} /> {/* Add the TaskForm component */}
        <TaskList
          tasks={tasksData.map(task => ({
            id: task.id,
            title: task.title,
            description: task.description,
            isComplete: task.is_complete
          }))}
          onTaskClickCallback={handleCompleteTask}
          onTaskDeleteCallback={handleUnregisterTask}
        />
      </main>
    </div>
  );
};

export default App;