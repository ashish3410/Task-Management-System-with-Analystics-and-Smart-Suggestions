import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#10b981", "#f59e0b", "#6366f1"]; // green, amber, indigo

export default function ProjectAnalytic({ projectId, loadStats }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const {loadStats}=refresh()

  useEffect(() => {
    fetchAnalytics();
  }, [projectId, loadStats]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/pro_stat/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      console.log("Full Analytics Response:", res.data);
      console.log("Task Details:", res.data.task_details);
      setData(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-300 mt-10">
        Loading Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-10">
        {error}
      </div>
    );
  }

  if (!data || !data.task_details) {
    return (
      <div className="text-center text-gray-300 mt-10">
        No analytics data available
      </div>
    );
  }

  const taskDetails = data?.task_details;

  // Pie Chart Data - Task Status
  const pieData = [
    { 
      name: "Completed", 
      value: Number(taskDetails.completed_tasks) || 0 
    },
    { 
      name: "In Progress", 
      value: Number(taskDetails.in_progress) || 0 
    },
    { 
      name: "Pending", 
      value: Number(taskDetails.pending_tasks) || 0 
    },
  ];

  // Bar Chart Data - Priority Distribution
  const highPriority = Number(taskDetails.high_priority_tasks) || 0;
  const lowPriority = Number(taskDetails.low_priority_tasks) || 0;
  const mediumPriority = Number(taskDetails.medium_priority_tasks || 0); 
  const totalTasks = Number(taskDetails.total_tasks) || 0;
  
  // Calculate medium priority
 
   
  // NEW: Use a single data point with all three priorities
  const barData = [
    { 
      name: "Priority Tasks",
      high: highPriority,
      medium: mediumPriority,
      low: lowPriority
    }
  ];

  // Filter out zero values for pie chart
  const filteredPieData = pieData.filter(item => item.value > 0);

  const progressPercent = Number(taskDetails.progress_percent) || 0;

  // Debug logging
  console.log("Pie Data:", pieData);
  console.log("Bar Data:", barData);

  return (
    <div className="mt-10 space-y-8">
      <h2 className="text-3xl font-bold bg-linear-to-r from-indigo-400 to-purple-400 
                     bg-clip-text text-transparent">
        Project Analytics
      </h2>

      {/* Progress Card */}
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
        <h3 className="text-white text-xl font-semibold mb-4">Progress</h3>

        <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-indigo-500 to-purple-500 
                       transition-all duration-700"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>

        <p className="text-sm text-gray-300 mt-2">
          {progressPercent.toFixed(1)}% completed
        </p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
          <h3 className="text-white text-xl font-semibold mb-4">
            Task Status
          </h3>

          {filteredPieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={50}
                  paddingAngle={5}
                  label={({ name, value, percent }) => 
                    `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                  }
                >
                  {filteredPieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: "#fff" }}
                  iconType="circle"
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-center py-20">
              No task data available
            </div>
          )}
        </div>

        {/* Bar Chart - FIXED VERSION */}
        <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/10">
          <h3 className="text-white text-xl font-semibold mb-4">
            Priority Distribution
          </h3>

          {(highPriority > 0 || mediumPriority > 0 || lowPriority > 0) ? (
            <ResponsiveContainer width="100%" height={300} className={'hover:bg-none'}>
              <BarChart data={barData}>
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                />
                <YAxis 
                  stroke="#9ca3af"
                  tick={{ fill: '#9ca3af' }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: "#fff" }}
                />
                <Bar
                  dataKey="high"
                  fill="#ef4444"
                  radius={[8, 8, 0, 0]}
                  name="High Priority"
                />
                <Bar
                  dataKey="medium"
                  fill="#f59e0b"
                  radius={[8, 8, 0, 0]}
                  name="Medium Priority"
                />
                <Bar
                  dataKey="low"
                  fill="#10b981"
                  radius={[8, 8, 0, 0]}
                  name="Low Priority"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-gray-400 text-center py-20">
              No priority data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}