import { useState, useEffect } from 'react';
import styles from '../styles/taskForm.module.css'; 

const EditTaskForm = ({ task, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const [assignee, setAssignee] = useState(task.assignee);
  const [dueDate, setDueDate] = useState(task.dueDate);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setStatus(task.status);
    setAssignee(task.assignee);
    setDueDate(task.dueDate);
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      status,
      assignee,
      dueDate,
    };

    onUpdate(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="title" className={styles.label}>Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.textarea}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="priority" className={styles.label}>Priority</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.select}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="status" className={styles.label}>Status</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="assignee" className={styles.label}>Assignee</label>
        <input
          type="text"
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="dueDate" className={styles.label}>Due Date</label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>Update Task</button>
        <button type="button" onClick={onCancel} className={styles.buttonCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default EditTaskForm;
