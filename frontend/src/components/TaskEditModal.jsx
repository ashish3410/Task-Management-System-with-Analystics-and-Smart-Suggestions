import React, { useState, useEffect } from "react";

const TaskEditModal = ({ task, isOpen, onClose, onSave,setloadSates }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveHandler = () => {
    onSave(formData);
    setloadSates(prev => !prev);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 text-white animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
          Edit Task
        </h2>

        {/* Title */}
        <input
          name="title"
          type="text"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition mb-4"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition h-28 mb-4"
        />

        {/* Priority */}
        <label className="block text-gray-200 font-semibold mb-1">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mb-4 
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="low" className="text-black">Low</option>
          <option value="medium" className="text-black">Medium</option>
          <option value="high" className="text-black">High</option>
        </select>

        {/* Status */}
        <label className="block text-gray-200 font-semibold mb-1">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white mb-6
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="pending" className="text-black">Pending</option>
          <option value="in_progress" className="text-black">In Progress</option>
          <option value="completed" className="text-black">Completed</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-gray-200
                       hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={saveHandler}
            className="px-5 py-2 rounded-lg font-semibold bg-linear-to-r from-indigo-600 to-purple-600
                       hover:from-indigo-700 hover:to-purple-700 transition shadow-lg shadow-indigo-900/40"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
