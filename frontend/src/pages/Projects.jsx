import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../utils/axios";
import Navbar from "../components/Navbar";
import SideBar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";
import AddProjectModal from "../components/AddProjectModal";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await API.get("/projects/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const gotoProject = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-black via-slate-900 to-indigo-900 text-white">
      
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <Navbar />
      </header>

      {/* Main Layout */}
      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 border-r border-white/10 bg-black/40 backdrop-blur-xl">
          <SideBar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden p-4">

          {/* Page Header */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-linear-to-r from-indigo-600/20 to-purple-500/20 p-6 backdrop-blur-xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent">
                  Your Projects
                </h1>
                <p className="mt-1 text-sm text-gray-300">
                  Manage, edit, and track all your projects in one place.
                </p>
              </div>

              <button
                onClick={() => setShowModal(true)}
                className="rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-2.5 font-semibold shadow-lg shadow-indigo-900/50 transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
              >
                + Add Project
              </button>
            </div>
          </div>

          {/* Projects Section */}
          <h3 className="mb-2 ml-4 text-2xl font-bold">Projects</h3>
          <hr className="mb-8 mx-4 border-white/20" />

          <div className="mx-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => gotoProject(project.id)}
                className="cursor-pointer"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Modal */}
          {showModal && (
            <AddProjectModal
              onClose={() => {
                setShowModal(false);
                loadProjects();
              }}
            />
          )}

        </main>
      </div>
    </div>
  );
};

export default Projects;
