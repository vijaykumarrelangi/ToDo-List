import React from "react";

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{task.assignedTo}</td>
      <td>{task.status}</td>
      <td>{task.dueDate}</td>
      <td>{task.priority}</td>
      <td>{task.comments}</td>
      <td>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task)}>Delete</button>
      </td>
    </tr>
  );
};

export default TaskItem;