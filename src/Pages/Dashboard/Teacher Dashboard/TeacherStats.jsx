import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { FaBookOpen, FaChalkboardTeacher } from "react-icons/fa";

// Pie Chart Colors
const COLORS = ["#0088FE", "#FF8042"];

const TeacherStats = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/classes?teacherEmail=${user.email}`)
        .then((response) => {
          const classes = response.data;
          setTotalClasses(classes.length);

          // Calculate total assignments
          let assignmentCount = 0;
          classes.forEach((cls) => {
            if (Array.isArray(cls.assignments)) {
              assignmentCount += cls.assignments.length;
            }
          });

          setTotalAssignments(assignmentCount);
        })
        .catch((error) => console.error("Error fetching teacher stats:", error));
    }
  }, [user?.email, axiosPublic]);

  // Data for Pie Chart (Assignments Distribution)
  const assignmentData = [
    { name: "Total Classes", value: totalClasses },
    { name: "Total Assignments", value: totalAssignments },
  ];

  // Data for Bar Chart (Total Classes and Assignments Distribution)
  const distributionData = [
    { name: "Classes", value: totalClasses },
    { name: "Assignments", value: totalAssignments },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Classes Card */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaBookOpen className="text-purple-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Classes</p>
            <h3 className="text-xl font-bold">{totalClasses}</h3>
          </div>
        </div>

        {/* Total Assignments Card */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaChalkboardTeacher className="text-green-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Assignments</p>
            <h3 className="text-xl font-bold">{totalAssignments}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Assignments Distribution (Pie Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Assignments Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={assignmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) =>
                  percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
                }
              >
                {assignmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Total Classes and Assignments Distribution (Bar Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Classes and Assignments Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={distributionData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="value" fill="#82ca9d" name="Classes & Assignments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TeacherStats;
