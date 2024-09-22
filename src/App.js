import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmationModal from './components/ConfirmationModal';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Update localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTaskClick = () => {
    setIsFormVisible(true);
    setCurrentTask(null);
  };

  const handleEditTaskClick = (task) => {
    setIsFormVisible(true);
    setCurrentTask(task);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
    setCurrentTask(null);
  };

  const handleAddTask = (newTask) => {
    if (currentTask) {
      setTasks(tasks.map(task => (task.id === currentTask.id ? { ...task, ...newTask } : task)));
    } else {
      setTasks([...tasks, { ...newTask, id: Date.now() }]);
    }
    handleFormClose();
  };

  const handleDeleteTask = (id) => {
    setIsModalVisible(true); // Show the modal
    setTaskToDelete(id); // Save the task ID to delete
  };

  const confirmDeleteTask = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete));
    setIsModalVisible(false);
  };

  const cancelDeleteTask = () => {
    setIsModalVisible(false);
    setTaskToDelete(null);
  };

  // Filtered tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setSearchQuery('');  // Clear the search input
    const savedTasks = localStorage.getItem('tasks');  // Reload tasks from localStorage
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  };

  // Calculate pagination data
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  // Change page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="App">
      <h1 className="heading">Task Management</h1>
      <div className="container">
        <div className="button-container">
          <button className="primary" onClick={handleAddTaskClick}>Add Task</button> &nbsp;
          <button className="secondary" onClick={handleRefresh}>Refresh</button>
        </div>

        <div className="search-bar">
          <svg xmlns="(link unavailable)" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
            <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <TaskList tasks={currentTasks} onEditTask={handleEditTaskClick} onDeleteTask={handleDeleteTask} />

      {/* TaskForm in Modal */}
      <Modal isVisible={isFormVisible} onClose={handleFormClose}>
        <TaskForm
          task={currentTask}
          onSubmit={handleAddTask}
          onClose={handleFormClose}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      {isModalVisible && (
        <ConfirmationModal
          onConfirm={confirmDeleteTask}
          onCancel={cancelDeleteTask}
        />
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{` Page ${currentPage} of ${totalPages} `}</span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    </div>
  );
}

export default App;