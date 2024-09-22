import React from 'react';
import './TaskList.css';

function TaskList({ tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="task-list">
      <table className="task-table">
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.description}</td>
              <td>
                <button className="edit-btn" onClick={() => onEditTask(task)}>Edit</button>&nbsp; &nbsp;
                <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;