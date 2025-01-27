import React, { useState, useEffect } from "react";

const OurTopCourses = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes"); 
        const data = await response.json();
        
        const latestCourses = data.slice(0, 6);
        setCourses(latestCourses); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoading(false); 
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>; 
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Our Top Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div
            key={course._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{course.title || "Untitled Course"}</h2>
            <p><strong>Teacher:</strong> {course.teacherEmail}</p>
            <p><strong>Price:</strong> ${course.price || "N/A"}</p>
            <p><strong>Description:</strong> {course.description || "No description available."}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTopCourses;
