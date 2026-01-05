import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../utils/axios";
import TaskList from "../components/TaskList";
import AddTaskModal from "../components/AddTaskModal";
import ProjectAnalytic from "../components/ProjectAnalytic";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [search, setSearch] = useState("")
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadStats, setLoadStats] = useState(false);

  useEffect(() => {
    loadProject();
    loadTasks();
  }, []);

  const loadProject = async () => {
    const res = await API.get(`/projects/${id}/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    setProject(res.data);
  };

  const loadTasks = async () => {
    const res = await API.get(`/projects/${id}/tasks/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    setTasks(res.data);
  };
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      statusFilter === "all" || task.status === statusFilter;

    const priorityMatch =
      priorityFilter === "all" || task.priority === priorityFilter;

    const searchMatch =
      task.title.toLowerCase().includes(search.toLowerCase());

    return statusMatch && priorityMatch && searchMatch;
  });

  if (!project) return <h2>Loading...</h2>;

  return (
    <div className="flex bg-[#0a0f1f] min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Navbar */}
        <Navbar />

        <div style={{ padding: "20px" }}>
          <h1 className="text-white capitalize text-transform: capitalize;">{(project.title)}</h1>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            {project.description}
          </p>

          {/* Small Analytics Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div
              className="bg-white/5 text-white"
              style={card}>Total Tasks: {tasks.length}</div>
            <div
              className="bg-white/5 text-white"
              style={card}>

              Completed: {filteredTasks.filter((t) => t.status === "Completed").length}
            </div>
            <div
              className="bg-white/5 text-white"

              style={card}>
              Pending: {filteredTasks.filter((t) => t.status !== "Completed").length}
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            + Add Task
          </button>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 rounded-2xl 
      bg-linear -to-br from-neutral-700/40 to-neutral-900/40 
      backdrop-blur-xl border border-white/15 shadow-2xl">

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-neutral-900/60 text-gray-100 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none 
          hover:bg-neutral-800/70 transition-all duration-300 
          focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-neutral-900/60 text-gray-100 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none 
          hover:bg-neutral-800/70 transition-all duration-300 
          focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-neutral-900/60 text-gray-100 border border-white/20 rounded-xl px-4 py-2 text-sm outline-none 
          placeholder:text-gray-400 
          hover:bg-neutral-800/70 transition-all duration-300 
          focus:border-violet-500 focus:ring-2 focus:ring-violet-500/40"
            />
          </div>
          <TaskList tasks={filteredTasks} refresh={{loadTasks, setLoadStats}} />

          {showModal && (
            <AddTaskModal
              projectId={id}
              close={() => setShowModal(false)}
              refresh={loadTasks}
              setLoadStats={setLoadStats}
            />
          )}
        </div>
        <ProjectAnalytic projectId={project?.id} loadStats={loadStats} />
      </div>
    </div>
  );
}

const card = {
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(5,0,0,0.1)",
};