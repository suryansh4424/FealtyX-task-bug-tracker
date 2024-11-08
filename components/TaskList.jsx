import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, onDeleteTask, onUpdateTask }) => {
  const [expandedTask, setExpandedTask] = useState(null); 
  const [statusDropdown, setStatusDropdown] = useState(null); 
  const [editModeTask, setEditModeTask] = useState(null); 
  const [editedTaskDetails, setEditedTaskDetails] = useState({}); 
  const [showModal, setShowModal] = useState(false); 

  const handleStatusChange = (taskId, newStatus) => {
    onUpdateTask(taskId, { ...editedTaskDetails, status: newStatus });
    setStatusDropdown(null); 
  };

  const handleEditChange = (field, value) => {
    setEditedTaskDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const toggleStatusDropdown = (taskId, e) => {
    e.stopPropagation(); 
    setStatusDropdown(statusDropdown === taskId ? null : taskId); 
  };

  const handleEditClick = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    setEditedTaskDetails({
      title: task.title,
      description: task.description,
      status: task.status,
      assignee: task.assignee,
      dueDate: task.dueDate,
      totalTimeSpent: task.totalTimeSpent, 
    });
    setShowModal(true); 
  };

  const handleSaveEdit = (taskId) => {
    onUpdateTask(taskId, editedTaskDetails);
    setShowModal(false); 
    setEditedTaskDetails({}); 
  };

  const handleCloseModal = () => {
    setShowModal(false); 
    setEditedTaskDetails({}); 
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setExpandedTask(task.id)}
              style={{
                width: '300px',
                cursor: 'pointer',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                backgroundColor: task.priority === 'High' ? '#e53e3e' :
                                task.priority === 'Medium' ? '#ecc94b' : '#48bb78',
                padding: '1rem',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                {task.title}
              </h3>

              {expandedTask === task.id && ( 
                <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                  <p><strong>Description:</strong> {task.description}</p>
                  <p><strong>Status:</strong> {task.status}</p>
                  <p><strong>Assignee:</strong> {task.assignee}</p>
                  <p><strong>Due Date:</strong> {task.dueDate}</p>
                  <p><strong>Total Time Spent:</strong> {task.totalTimeSpent}</p>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteTask(task.id); }}
                      style={{
                        backgroundColor: '#e53e3e',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => handleEditClick(task.id)}
                      style={{
                        backgroundColor: '#3182ce',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      Edit Task
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h3>Edit Task</h3>
            <label>Title:</label>
            <input
              type="text"
              value={editedTaskDetails.title}
              onChange={(e) => handleEditChange('title', e.target.value)}
              style={modalStyles.input}
            />

            <label>Description:</label>
            <textarea
              value={editedTaskDetails.description}
              onChange={(e) => handleEditChange('description', e.target.value)}
              style={modalStyles.textarea}
            />

            <label>Status:</label>
            <select
              onChange={(e) => handleEditChange('status', e.target.value)}
              value={editedTaskDetails.status}
              style={modalStyles.input}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            <label>Assignee:</label>
            <input
              type="text"
              value={editedTaskDetails.assignee}
              onChange={(e) => handleEditChange('assignee', e.target.value)}
              style={modalStyles.input}
            />

            <label>Due Date:</label>
            <input
              type="date"
              value={editedTaskDetails.dueDate}
              onChange={(e) => handleEditChange('dueDate', e.target.value)}
              style={modalStyles.input}
            />

            <label>Total Time Spent:</label>
            <input
              type="number"
              value={editedTaskDetails.totalTimeSpent}
              onChange={(e) => handleEditChange('totalTimeSpent', e.target.value)}
              style={modalStyles.input}
            />

            <div style={modalStyles.actions}>
              <button onClick={handleSaveEdit} style={modalStyles.saveButton}>Save</button>
              <button onClick={handleCloseModal} style={modalStyles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '600px',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    height: '100px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  saveButton: {
    backgroundColor: '#48bb78',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#e53e3e',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      assignee: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      totalTimeSpent: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onUpdateTask: PropTypes.func.isRequired,
};

export default TaskList;
