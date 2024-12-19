import {useEffect, useState} from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';
import axios from 'axios';


const App = () => {
  const [tasksData, setTasks] = useState([]);

  const fetchTasks = () => axios.get('http://localhost:5000/tasks')
    .then(tasks => setTasks(tasks.data));

  const markTaskComplete = taskId => axios.patch(`http://localhost:5000/tasks/${taskId}/mark_complete`)
    .then(fetchTasks);

  const markTaskIncomplete = taskId => axios.patch(`http://localhost:5000/tasks/${taskId}/mark_incomplete`)
    .then(fetchTasks);

  const unregisterTask = taskId => axios.delete(`http://localhost:5000/tasks/${taskId}`)
    .then(fetchTasks);

  useEffect( () => {
    fetchTasks();
  }, []);

  const handleCompleteTask = (id) => {
    tasksData.filter(task => task.id === id).map( task => {
      if (task.is_complete === true) {
        markTaskIncomplete(id);
      } else {
        markTaskComplete(id);
      }
    });
  };
  const handleUnregisterTask = (id) => {
    tasksData.filter(task => task.id === id).map(task => unregisterTask(task.id));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <TaskList tasks={tasksData.map(task => ({id: task.id, title: task.title, isComplete: task.is_complete}))}
          onTaskClickCallback={handleCompleteTask}
          onTaskDeleteCallback={handleUnregisterTask}/>
      </main>
    </div>
  );
};

export default App;
