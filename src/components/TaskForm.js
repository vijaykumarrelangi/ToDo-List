import React, { useState, useEffect } from 'react';
import './TaskForm.css';

function TaskForm({ task, onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    description: ''
  });

  useEffect(() => {
    if (task) {
      setFormData(task);
    } else {
      setFormData({
        assignedTo: '',
        status: 'Not Started',
        dueDate: '',
        priority: 'Normal',
        description: ''
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Pass the form data to the onSubmit function
    onClose();  // Close the form after saving
  };

  const handleCancel = () => {
    onClose();  // Close the form on cancel
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{task ? 'Edit Task' : 'New Task'}</h2>

      <label>Assigned To</label>
      <input
        type="text"
        name="assignedTo"
        value={formData.assignedTo}
        onChange={handleChange}
        required
      />

      <label>Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label>Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        required
      />

      <label>Priority</label>
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>

      <label>Comments</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows="4"
        required
      />

      <div className="form-actions">
        <button type="submit" className="save-btn">{task ? 'Save Changes' : 'Add Task'}</button>
        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default TaskForm;