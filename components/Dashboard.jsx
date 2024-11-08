import { useState } from 'react';
import styles from '../styles/Dashboard.module.css'; 

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');
  const [taskStatus, setTaskStatus] = useState('Open');
  const [taskAssignee, setTaskAssignee] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      status: taskStatus,
      assignee: taskAssignee,
      dueDate: taskDueDate,
      createdAt: new Date().toISOString(),
      totalTimeSpent: 0, 
    };

    setTasks([...tasks, newTask]);
    resetForm();
  };

  const resetForm = () => {
    setTaskTitle('');
    setTaskDescription('');
    setTaskPriority('Low');
    setTaskStatus('Open');
    setTaskAssignee('');
    setTaskDueDate('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      setTaskTitle(taskToEdit.title);
      setTaskDescription(taskToEdit.description);
      setTaskPriority(taskToEdit.priority);
      setTaskStatus(taskToEdit.status);
      setTaskAssignee(taskToEdit.assignee);
      setTaskDueDate(taskToEdit.dueDate);
      handleDeleteTask(taskId); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <button onClick={handleAddTask} className={styles.button}>Add Task</button>
      </div>

    
      <div className={styles.formContainer}>
        <input
          type="text"
          placeholder="Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className={styles.input}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className={styles.select}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={taskStatus}
          onChange={(e) => setTaskStatus(e.target.value)}
          className={styles.select}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
        <input
          type="text"
          placeholder="Assignee"
          value={taskAssignee}
          onChange={(e) => setTaskAssignee(e.target.value)}
          className={styles.input}
        />
        <input
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className={styles.input}
        />
      </div>

   
      <div className={styles.taskList}>
        {tasks.map(task => (
          <div key={task.id} className={styles.taskItem}>
            <div>
              <h3 className={styles.taskTitle}>{task.title}</h3>
              <p>{task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> <span className={`${styles.status} ${styles[task.status.toLowerCase()]}`}>{task.status}</span></p>
              <p><strong>Assignee:</strong> {task.assignee}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task.id)} className={styles.button}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)} className={styles.button}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
