// /utils/dataHandler.js

let tasks = [
    {
      id: 1,
      title: 'Fix login bug',
      description: 'User cannot login with correct credentials.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'John Doe',
      createdAt: '2024-11-01',
      timeSpent: 2, // Time spent in hours
    },
    {
      id: 2,
      title: 'Implement time tracking',
      description: 'Add time tracker functionality to the app.',
      priority: 'Medium',
      status: 'Completed',
      assignee: 'Jane Smith',
      createdAt: '2024-11-02',
      timeSpent: 4,
    },
  ];
  
  // Fetch all tasks
  export const getTasks = () => {
    return tasks;
  };
  
  // Create a new task
  export const createTask = (task) => {
    const newTask = { ...task, id: tasks.length + 1 }; // Generate new ID based on length of current tasks
    tasks.push(newTask); // Add new task to the array
    return newTask;
  };
  
  // Edit an existing task
  export const editTask = (id, updatedTask) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updatedTask };
      return tasks[index];
    }
    return null;
  };
  
  // Delete a task by its ID
  export const deleteTask = (id) => {
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1); // Remove task from the array
      return true;
    }
    return false;
  };
  
  // Get a specific task by its ID
  export const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };
  