import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";

export default function AddProjectModal({ onClose, onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const createProject = async () => {
    if (!title.trim()) {
      alert("Please provide a project title.");
      return;
    }

    setIsCreating(true);
    try {
      await API.post(
        "/projects/",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // let parent refresh list
      if (typeof onSuccess === "function") onSuccess();

      // close modal
      if (typeof onClose === "function") onClose();

      // optional: navigate or show toast
      // navigate("/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      // clicking the overlay closes the modal
      onClick={() => {
        if (!isCreating && typeof onClose === "function") onClose();
      }}
    >
      {/* stop overlay click from propagating when clicking inside modal */}
      <div
        className="w-full max-w-md bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl border border-white/20 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4 bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
          Add Project
        </h2>

        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        />

        <textarea
          placeholder="Project description"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 mt-4 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          disabled={isCreating}
        />

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => {
              if (!isCreating && typeof onClose === "function") onClose();
            }}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition text-gray-200"
            disabled={isCreating}
          >
            Cancel
          </button>

          <button
            onClick={createProject}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              isCreating
                ? "bg-indigo-400/60 cursor-not-allowed"
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
