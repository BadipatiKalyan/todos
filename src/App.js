import React, { useState, useEffect } from 'react';
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [editingTask, setEditingTask] = useState(null); // Track the task being edited
  const [editedTaskContent, setEditedTaskContent] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTodos([...todos, { id: todos.length + 1, title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTaskCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  // Function to start editing a task
  const startEditingTask = (id, content) => {
    setEditingTask(id);
    setEditedTaskContent(content);
  };

  // Function to finish editing a task
  const finishEditingTask = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editedTaskContent } : todo
    );
    setTodos(updatedTodos);
    setEditingTask(null);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" placeholder="Add a new task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <div>
        <label>Show Completed:
          <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
        </label>
      </div>
      <ul>
        {todos.map((todo) =>
          (showCompleted || !todo.completed) && (
            <li key={todo.id}>
              {editingTask === todo.id ? ( // Check if this task is being edited
                <>
                  <input
                    type="text"
                    value={editedTaskContent}
                    onChange={(e) => setEditedTaskContent(e.target.value)}
                  />
                  <button onClick={() => finishEditingTask(todo.id)}>Done</button>
                </>
              ) : (
                <>
                  <span
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    onClick={() => toggleTaskCompletion(todo.id)}
                  >
                    {todo.title}
                  </span>
                  <div class="button-container">
                  <button onClick={() => startEditingTask(todo.id, todo.title)}>Edit</button>
                  <button onClick={() => deleteTask(todo.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default App;
