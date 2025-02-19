import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { FaUserGraduate, FaChalkboardTeacher, FaBookOpen, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

// Pie Chart Colors
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Users
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch Teacher Applications
  const { data: teachers = [] } = useQuery({
    queryKey: ["teacherRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teach-applications");
      return res.data;
    },
  });

  // Fetch Classes
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });

 // Fetch Payments
 const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  // Total Counts
  const totalUsers = users.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalSales = payments.length;
  const totalRevenue = payments.reduce((sum, payment) => sum + parseFloat(payment.price || 0), 0);

  // Generate Monthly Sales Data
  const salesData = [];
  if (payments.length > 0) {
    const monthlySales = {};
    payments.forEach(payment => {
      const month = new Date(payment.date).toLocaleString('default', { month: 'short' });
      monthlySales[month] = (monthlySales[month] || 0) + parseFloat(payment.price || 0);
    });
    Object.keys(monthlySales).forEach(month => {
      salesData.push({ month, revenue: monthlySales[month] });
    });
  }
  // Generate Class Category Distribution
  const classCategoryData = [];
  if (classes.length > 0) {
    const categoryCount = {};
    classes.forEach(cls => {
      if (cls.title) {
        categoryCount[cls.title] = (categoryCount[cls.title] || 0) + 1;
      }
    });
    Object.keys(categoryCount).forEach(category => {
      classCategoryData.push({
        name: category,
        classes: categoryCount[category],
      });
    });
  }

  // Generate Teacher Distribution Data
  const teacherData = [
    { name: "Pending", value: teachers.filter(t => t.status === "pending").length },
    { name: "Approved", value: teachers.filter(t => t.status === "Accepted").length },
    { name: "Rejected", value: teachers.filter(t => t.status === "rejected").length },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Admin Dashboard Stats</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaUserGraduate className="text-blue-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Users</p>
            <h3 className="text-xl font-bold">{totalUsers}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaChalkboardTeacher className="text-green-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Teachers Application </p>
            <h3 className="text-xl font-bold">{totalTeachers}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaBookOpen className="text-purple-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Classes</p>
            <h3 className="text-xl font-bold">{totalClasses}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaDollarSign className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Sales</p>
            <h3 className="text-xl font-bold">{totalSales}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaDollarSign className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Revenue</p>
            <h3 className="text-xl font-bold">${totalRevenue}</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Class Categories (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Class Categories</h3>
          {classCategoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={classCategoryData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="classes" fill="#8884d8" name="Classes" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500">
              No category data available
            </div>
          )}
        </div>

        {/* Teacher Distribution (Pie Chart) */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Teacher Application Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie 
                data={teacherData} 
                dataKey="value" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                fill="#8884d8"
                label={({ name, percent }) => percent > 0 ? `${name}: ${(percent * 100).toFixed(0)}%` : ''}
              >
                {teacherData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} Teachers`, 'Count']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Monthly Sales (Bar Chart) */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Sales Revenue</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
