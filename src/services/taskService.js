// TaskService.js
export const getTasks = async () => {
    // Simulate an API call
    return [
      { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '2024-10-12', priority: 'Low', description: 'Task 1' },
      { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '2024-09-14', priority: 'High', description: 'Task 2' },
    ];
  };