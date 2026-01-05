import React, { useState } from "react";
import API from "../utils/axios";

export default function AddTaskModal({ close, refresh, projectId }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("pending");
  const [deadline, setDeadline] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const createTask = async () => {
    if (isCreating) return;
    setIsCreating(true);

    try {
      await API.post(
        `/projects/${projectId}/tasks/`,
        {
          title,
          description: desc,
          priority,
          status,
          deadline: deadline || null,
          project: projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      refresh();
      close();
    } catch (error) {
      console.log(error.response?.data);
      alert("Error creating task");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      onClick={() => {
        if (!isCreating && typeof close === "function") close();
      }}
    >
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
          Add Task
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        />

        {/* Description */}
        <textarea
          placeholder="Task description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 mt-4 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        />

        {/* Priority */}
        <label className="block mt-4 text-gray-200">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        >
          <option value="low" className="text-black">Low</option>
          <option value="medium" className="text-black">Medium</option>
          <option value="high" className="text-black">High</option>
        </select>

        {/* Status */}
        <label className="block mt-4 text-gray-200">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        >
          <option value="pending" className="text-black">Pending</option>
          <option value="in_progress" className="text-black">In Progress</option>
          <option value="completed" className="text-black">Completed</option>
        </select>

        {/* Deadline */}
        <label className="block mt-4 text-gray-200">Deadline</label>
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        />

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => {
              if (!isCreating && typeof close === "function") close();
            }}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition text-gray-200"
            disabled={isCreating}
          >
            Cancel
          </button>

          <button
            onClick={createTask}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              isCreating
                ? "bg-indigo-400/50 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-900/40"
            }`}
            disabled={isCreating}
          >
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
