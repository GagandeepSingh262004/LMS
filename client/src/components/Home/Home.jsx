import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import { PiStudent } from "react-icons/pi";
import { RiBookShelfLine } from "react-icons/ri";
import axios from "axios";

const Home = () => {
  const [allStudents, setAllStudents] = useState([]);

  const getAllStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/student/getAllStudents"
      );
      setAllStudents(response.data); // ✅ Only set the data array
      console.log("Fetched students:", response.data);
    } catch (error) {
      console.log("Error fetching students:", error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#EFF1F8]">
      {/* Sidebar */}
      <div className="w-full md:w-[20px] bg-gradient-to-b from-purple-600 via-indigo-600 to-blue-700 fixed md:static h-[60px] md:h-screen z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 mt-[60px] md:mt-0 md:ml-[220px] p-4 space-y-6">
        <div className="flex flex-wrap justify-center gap-5">
          <div className="flex flex-col justify-center px-6 bg-gradient-to-b from-purple-600 via-indigo-600 to-blue-700 border border-white w-full max-w-[320px] h-[150px] rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-white text-center">
              <div className="flex justify-center items-center gap-2">
                <PiStudent className="text-3xl" />
                Enrolled Students
              </div>
            </h2>
            <p className="text-3xl font-bold text-white text-center mt-4">
              {allStudents.length}
            </p>
          </div>

          <div className="flex flex-col justify-center px-6 bg-gradient-to-b from-purple-600 via-indigo-600 to-blue-700 border border-white w-full max-w-[320px] h-[150px] rounded-2xl cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-semibold text-white text-center">
              <div className="flex justify-center items-center gap-2">
                <RiBookShelfLine className="text-3xl" />
                Courses
              </div>
            </h2>
            <p className="text-3xl font-bold text-white text-center mt-4">6</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto p-4">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Roll Number</th>
                <th className="px-6 py-3">Course Opted</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.length > 0 ? (
                allStudents.map((student, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {student.fullName}
                    </td>
                    <td className="px-6 py-4">{student.studentId}</td>
                    <td className="px-6 py-4">{student.courseName}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
