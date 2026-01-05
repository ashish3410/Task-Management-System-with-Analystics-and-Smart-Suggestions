import React from "react";
import SideBar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AnalyticsCard from "../components/AnalyticsCard";
import AISuggesstions from "../components/AISuggesstions";
import ProgressBar from "../components/ProgressBar";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
    const navigate=useNavigate()
    return (
        <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-indigo-900 text-white flex flex-col">
            {/* Top Navbar */}
            <div className="border-b border-white/10 bg-black/30 backdrop-blur-xl sticky top-0 z-20">
                <Navbar />
            </div>

            {/* Main content layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden md:block w-64 border-r border-white/10 bg-black/40 backdrop-blur-xl">
                    <SideBar />
                </aside>

                {/* Main Dashboard Content */}
                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
                    {/* Page header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
                                Dashboard
                            </h1>
                            <p className="text-sm text-white mt-1">
                                Overview of your AI-powered task manager
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-xs text-gray-300">System Status: Stable</span>
                        </div>
                    </div>

                    {/* Analytics + Suggestions layout */}
                    <div className="grid grid-cols-1 xl:grid-cols-[2fr,1fr] gap-6">
                        {/* Left: Analytics + content */}
                        <section className="space-y-6">
                            {/* Analytics cards row */}
                            <div className="text-black w-full">
                                {/* Cards Grid */}
                                <div className="grid w-full gap-4 text-black grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xl shadow-lg shadow-indigo-900/40">
                                        <AnalyticsCard />
                                    </div>
                                </div>
                            </div>
                            <button className="px-4 py-3 flex justify-center items-center bg-indigo-600 rounded-sm " accordion
                            onClick={()=>navigate('/projects')}
                            >Show All Projects</button>
                            <ProgressBar/>
                            {/* Placeholder for charts or more analytics */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-600/20 blur-3xl rounded-full" />
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-600/20 blur-3xl rounded-full" />
                                <h2 className="text-lg font-semibold mb-2">Productivity Overview</h2>
                                <p className="text-sm text-gray-300 mb-4">
                                    Visualize how your tasks evolve over time. (Attach charts here later.)
                                </p>
                                <div className="border border-dashed border-white/20 rounded-xl p-6 text-center text-sm text-gray-400">
                                    Chart / Graph component placeholder
                                </div>
                            </div>
                        </section>

                        {/* Right: AI Suggestions */}
                        <aside className="space-y-4">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-xl shadow-lg shadow-indigo-900/40 h-full">
                                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/30 border border-indigo-400/60 text-xs">
                                        AI
                                    </span>
                                    Smart Suggestions
                                </h2>
                                <p className="text-xs text-gray-300 mb-3">
                                    Your AI assistant analyzes your tasks and suggests next actions.
                                </p>
                                <div className="mt-4">
                                    <AISuggesstions />
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
