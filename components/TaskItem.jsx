// TaskItem.jsx
import React from 'react';
import styles from '../styles/TaskItem.module.css'; 

const TaskItem = ({ task, onEdit, onDelete }) => {
  const { title, description, priority, status, assignee, dueDate, totalTimeSpent } = task;

  return (
    <div className={styles.taskItem}>
      <div className={styles.taskDetails}>
        <h3 className={styles.taskTitle}>{title}</h3>
        <p className={styles.taskDescription}>{description}</p>
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Status:</strong> <span className={`${styles.status} ${styles[status.toLowerCase()]}`}>{status}</span></p>
        <p><strong>Assignee:</strong> {assignee}</p>
        <p><strong>Due Date:</strong> {dueDate}</p>
        <p><strong>Time Spent:</strong> {totalTimeSpent} hrs</p>
      </div>
      <div className={styles.taskActions}>
        <button onClick={() => onEdit(task)} className={styles.editButton}>Edit</button>
        <button onClick={() => onDelete(task.id)} className={styles.deleteButton}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
