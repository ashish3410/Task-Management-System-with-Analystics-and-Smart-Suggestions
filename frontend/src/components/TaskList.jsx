import React, { useState } from "react";
import TaskDeleteModal from "../components/TaskDeleteModal";
import TaskEditModal from "../components/TaskEditModal";
import API from "../utils/axios";
import { AwardIcon } from "lucide-react";

export default function TaskList({ tasks, loadTasks, setLoadStats}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const priorityColors = {
    low: "bg-green-500/20 text-green-400 border-green-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const statusColors = {
    pending: "bg-gray-500/20 text-gray-300 border-gray-500/30",
    in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    completed: "bg-green-600/20 text-green-300 border-green-600/30",
  };

  /* ============ UPDATE TASK ============ */
  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      await API.patch(`tasks/${taskId}/`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      await loadTasks(); // 🔁 re-fetch tasks
      setSelectedTask(null);
      setLoadStats(prev => !prev);
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
    }
  };

  /* ============ DELETE TASK ============ */
  const handleDeleteTask = async () => {
    try {
      await API.delete(`tasks/${deleteTaskId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      await refresh(); // 🔁 re-fetch tasks
      setDeleteTaskId(null);
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
      <h3 className="text-white text-2xl font-semibold mb-4">Tasks</h3>

      {tasks.length === 0 && (
        <p className="text-gray-300">No tasks available.</p>
      )}

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-md"
          >
            <h4 className={`text-xl font-bold text-white ${task.status==='completed'?'line-through':''}`}>
              {task.title}
            </h4>

            <p className={`text-gray-300 mt-2 `}>
              {task.description}
            </p>

            <div className="flex gap-3 mt-4">
              <span
                className={`px-3 py-1 text-sm border capitalize rounded-full font-medium ${priorityColors[task.priority]}`}
              >
                Priority: {task.priority}
              </span>

              <span
                className={`px-3 py-1 text-sm border capitalize rounded-full font-medium ${statusColors[task.status]}`}
              >
                Status: {task.status}
              </span>
            </div>

            <div className="flex justify-end mt-6 gap-x-4">
              <button
                className={`bg-green-400 px-4 py-2 rounded-xl  ${(task.status).toLowerCase()==='completed'?'opacity-20 cursor-not-allowed':''}`}
                onClick={() => setSelectedTask(task)}
                disabled={task.status === "completed"}
              >
                Edit
              </button>

              <button
                className={`bg-red-400 px-4 py-2 rounded-xl`}
                onClick={() => setDeleteTaskId(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <TaskEditModal
        isOpen={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        onSave={(data) =>
          handleUpdateTask(selectedTask.id, data)
        }
        setLoadStats={()=>setLoadStats()}
      />

      {/* DELETE MODAL */}
      <TaskDeleteModal
        isOpen={!!deleteTaskId}
        onClose={() => setDeleteTaskId(null)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
