import React from "react";

const TaskDeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="w-full max-w-sm bg-white/10 backdrop-blur-2xl p-6 rounded-2xl shadow-xl 
                   border border-white/20 text-white animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold bg-linear-to-r from-red-400 to-red-300 
                       bg-clip-text text-transparent mb-3">
          Delete Task?
        </h2>

        <p className="text-gray-200 mb-6 leading-relaxed">
          Are you sure you want to delete this task?  
          <br />This action cannot be undone.
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       hover:bg-white/20 transition text-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="px-5 py-2 rounded-lg font-semibold bg-linear-to-r from-red-600 to-red-500
                       hover:from-red-700 hover:to-red-600 transition shadow-lg shadow-red-900/40"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDeleteModal;
