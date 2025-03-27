// ListBug.tsx - Problèmes avec la gestion des listes et des clés React
import React, { useState } from "react";
interface Task {
  id: string;
  text: string;
  completed: boolean;
}
export const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Learn React", completed: true },
    { id: "2", text: "Build an app", completed: false },
    { id: "3", text: "Deploy to production", completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  // Bug 1: la methode d'attribution d'ID ne fonctionne pas 
  const addTask = () => {
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: (tasks.length + 1).toString(), // Bug:Math.floor(Math.random() * 3).toString() envoye tjs 0 , 1 ou 2 du coup on a pas d'id unique
      text: newTaskText,
      completed: false,
    };
    console.log("NEW TASK : ", newTask);
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };
  // Bug 2:
  const toggleComplete = (taskId: string) => {
    // Bug: à l'ajout d'une nouvelle tache toggleComplete ne fonctionne 
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      setTasks([...tasks]);
    }
  };

  // Bug 3:
  const deleteTask = (taskId: string) => {
    // Bug: utilisation incorrecte de splice car
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete); // Ne déclenche pas de re-render --FIXED
    
  };
  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {/* Bug 4: */}
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {/* Bug 5: */}
      <div>
        <p>Total: {tasks.length}</p>
        <p>Completed: {tasks.filter((t) => t.completed).length}</p>
        <p>
          Remaining: {tasks.length - tasks.filter((t) => t.completed).length}
        </p>
      </div>
    </div>
  );
};
