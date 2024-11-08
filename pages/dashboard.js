import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";
import Sidebar from "../components/Sidebar";
import TrendChart from "../components/TrendChart"; 
const Dashboard = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setDisplayName(storedEmail); 
    }

    const sampleTasks = [
      { 
        id: 1, 
        title: "Task 1", 
        description: "This is the task description.", 
        priority: "Low", 
        status: "Open", 
        assignee: "John Doe", 
        dueDate: "2024-11-10T10:00:00Z", 
        date: "2024-11-01T10:00:00Z" 
      },
      { 
        id: 2, 
        title: "Task 2", 
        description: "Task 2 description.", 
        priority: "Medium", 
        status: "In Progress", 
        assignee: "Jane Doe", 
        dueDate: "2024-11-12T12:00:00Z", 
        date: "2024-11-01T15:00:00Z" 
      },
      { 
        id: 3, 
        title: "Task 3", 
        description: "Task 3 description.", 
        priority: "High", 
        status: "Completed", 
        assignee: "John Doe", 
        dueDate: "2024-11-15T12:00:00Z", 
        date: "2024-11-02T12:00:00Z" 
      },
      { 
        id: 4, 
        title: "Task 4", 
        description: "Task 4 description.", 
        priority: "Low", 
        status: "Open", 
        assignee: "Emily Smith", 
        dueDate: "2024-11-18T09:00:00Z", 
        date: "2024-11-03T09:00:00Z" 
      }
    ];

    setTasks(sampleTasks); 
  }, []);

  const addTask = (task) => {
    let updatedTasks;
    if (editingIndex !== null) {
      updatedTasks = [...tasks];
      updatedTasks[editingIndex] = task;
      setEditingIndex(null);
    } else {
      updatedTasks = [...tasks, task];
    }
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTaskStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    router.push("/");
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar displayName={displayName} onLogout={handleLogout} />

      <div style={{ flex: 1, padding: '2rem', backgroundColor: 'white', minHeight: '100vh' }}>
        <h1 style={{ marginBottom: '1rem', fontSize: '2rem', fontWeight: 'bold' }}>Dashboard</h1>


        <TrendChart tasks={tasks} /> 

        <CreateTaskForm onCreate={addTask} taskToEdit={editingIndex !== null ? tasks[editingIndex] : null} />
        <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTaskStatus} />
      </div>
    </div>
  );
};

export default Dashboard;
