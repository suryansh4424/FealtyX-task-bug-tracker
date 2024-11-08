import { useState, useEffect } from 'react'; 
import styles from '../styles/TaskForm.module.css'; 

const CreateTaskForm = ({ onCreate, taskToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Open');
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setPriority(taskToEdit.priority);
      setStatus(taskToEdit.status);
      setAssignee(taskToEdit.assignee);
      setDueDate(taskToEdit.dueDate);
    } else {
      resetForm();
    }
  }, [taskToEdit]);

  
  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!title || !description || !assignee) {
      alert('Please fill in all required fields.');
      return;
    }

    
    const newTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(), 
      title,
      description,
      priority,
      status,
      assignee,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    
    onCreate(newTask);

    
    if (!taskToEdit) resetForm();
  };

  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('Low');
    setStatus('Open');
    setAssignee('');
    setDueDate('');
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
      <button type="submit" className={styles.button}>{taskToEdit ? "Update Task" : "Create Task"}</button>
    </form>
  );
};

export default CreateTaskForm;
