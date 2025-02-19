import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen } from "react-icons/fa";

// Generate Random Data
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Static Stats
const stats = {
  totalUsers: getRandomNumber(50, 100),
  totalTeachers: getRandomNumber(10, 30),
  totalClasses: getRandomNumber(20, 50),
};

// Mock Data for User Growth (Bar Chart)
const userGrowthData = [
  { month: "Jan", users: getRandomNumber(20, 50) },
  { month: "Feb", users: getRandomNumber(30, 60) },
  { month: "Mar", users: getRandomNumber(40, 80) },
];

// Mock Data for Class Enrollment (Line Chart)
const classEnrollmentData = [
  { month: "Jan", enrollments: getRandomNumber(10, 40) },
  { month: "Feb", enrollments: getRandomNumber(20, 50) },
  { month: "Mar", enrollments: getRandomNumber(30, 60) },
];

// Mock Data for Teacher Distribution (Pie Chart)
const teacherData = [
  { name: "Math", value: getRandomNumber(5, 15) },
  { name: "Science", value: getRandomNumber(5, 15) },
  { name: "Programming", value: getRandomNumber(5, 15) },
  { name: "Design", value: getRandomNumber(5, 15) },
];

// Pie Chart Colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminStats = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard Stats</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaUserGraduate className="text-blue-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Users</p>
            <h3 className="text-xl font-bold">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaChalkboardTeacher className="text-green-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Teachers</p>
            <h3 className="text-xl font-bold">{stats.totalTeachers}</h3>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaBookOpen className="text-purple-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Classes</p>
            <h3 className="text-xl font-bold">{stats.totalClasses}</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* User Growth (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={userGrowthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Bar dataKey="users" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Class Enrollments (Line Chart) */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Class Enrollments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={classEnrollmentData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" />
              <Line type="monotone" dataKey="enrollments" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Teacher Distribution (Pie Chart) */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Teacher Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={teacherData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {teacherData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminStats;
