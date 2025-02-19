import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
import { FaBook, FaDollarSign } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const StudentStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch payments
  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data.filter(payment => payment.BuyerEmail === user?.email);
    },
  });

  // Total stats
  const totalEnrolled = payments.length;
  const totalSpent = payments.reduce((sum, p) => sum + parseFloat(p.price || 0), 0);

  // Enrollment trend data
  const enrollmentData = payments.map(payment => ({
    date: new Date(payment.date).toLocaleDateString(),
    amount: parseFloat(payment.price || 0),
  }));

  // Course category distribution
  const categoryCounts = {};
  payments.forEach(payment => {
    categoryCounts[payment.courseTitle] = (categoryCounts[payment.courseTitle] || 0) + 1;
  });

  const categoryData = Object.keys(categoryCounts).map(title => ({
    name: title,
    count: categoryCounts[title],
  }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Dashboard Stats</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaBook className="text-blue-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Enrolled Classes</p>
            <h3 className="text-xl font-bold">{totalEnrolled}</h3>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
          <FaDollarSign className="text-green-500 text-3xl" />
          <div>
            <p className="text-md font-semibold">Total Spent</p>
            <h3 className="text-xl font-bold">${totalSpent.toFixed(2)}</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Enrollment Trend (Line Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={enrollmentData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" name="Spent Amount" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Course Categories (Bar Chart) */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Most Enrolled Courses</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" name="Enrollments" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StudentStats;
