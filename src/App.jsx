import { useState } from 'react';
import TaskList from './components/TaskList.jsx';
import './App.css';

const TASKS = [
  {
    id: 1,
    title: 'Mow the lawn',
    isComplete: false,
  },
  {
    id: 2,
    title: 'Cook Pasta',
    isComplete: true,
  },
  {
    id: 3,
    title: 'Feed a cat',
    isComplete: true,
  },
  {
    id: 4,
    title: 'Water plants',
    isComplete: false,
  },
  {
    id: 5,
    title: 'Shop groceries',
    isComplete: false,
  },

];

const App = () => {
  const [tasksData, setTask] = useState(TASKS);

  const handleCompleteTask = (id) => {
    setTask(tasksData => tasksData.map(task => {
      if (task.id ===id) {
        return {...task, isComplete: !task.isComplete };
      } else {
        return task;
      }
    }));
  };
  const handleUnregisterTask = (id) => {
    setTask(tasksData => tasksData.filter (task => {
      return task.id !== id;
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasksData} onClick={handleCompleteTask} onUnregisterTask={handleUnregisterTask} />}</div>
      </main>
    </div>
  );
};

export default App;
