import React, { useState, useRef } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";

const Student = () => {
  const printRef = useRef();
  const [previewUrl, setPreviewUrl] = useState("");
  const [studentExists, setStudentExists] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    }
  };
  const checkStudentId = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/student/${studentId}`);
      console.log("Student data from backend:", res.data.student);

      if (res.data.valid && res.data.student) {
        const student = res.data.student;

        setFormDetails({
          studentName: student.fullName || "",
          dateOfBirth: student.dateOfBirth
            ? new Date(student.dateOfBirth).toISOString().split("T")[0]
            : "",
          gender: student.gender || "",
          studentEmail: student.email || "",
          phoneNo: student.phoneNo || "",
          studentAddress: student.address || "",
          guardianName: student.guardian?.guardianName || "",
          guardianPhoneNo: student.guardian?.guardianPhoneNo || "",
          // courseName: student.courseName || "",
          // semester: courses[student.courseName]?.hasSemesters
          //   ? student.courseDuration || ""
          //   : "",
          // subCourse:
          //   student.courseName === "Professional"
          //     ? student.courseDuration || ""
          //     : "",
          // studyMode: student.courseType || "",
          // amountReceived: student.amountPaid || "",
          // paymentOption: student.paymentMethod || "",
          // emi: student.emiTenure || "",
        });

        setStudentExists(true);
        alert(
          `Student exists.\n\nPreviously opted for: ${student.courseName} (${student.courseDuration})\nTotal Fee: ₹${student.totalFee}\nPaid: ₹${student.amountPaid}\nRemaining: ₹${student.remainingFee}`
        );
      } else {
        setStudentExists(false);
        alert("Student does not exist. Please fill the form manually.");
      }
    } catch (err) {
      alert("An error occurred while checking the student ID.");
    }
  };

  const [formDetails, setFormDetails] = useState({
    studentName: "",
    dateOfBirth: "",
    gender: "",
    studentEmail: "",
    phoneNo: "",
    studentAddress: "",
    guardianName: "",
    guardianPhoneNo: "",
    courseName: "",
    semester: "",
    subCourse: "",
    studyMode: "",
    amountReceived: "",
    paymentOption: "",
    emi: "",
  });

  const [file, setFile] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "courseName") {
        updated.semester = "";
        updated.subCourse = "";
      }
      return updated;
    });
  };

  const generateStudentId = () => {
    const { courseName } = formDetails;
    if (!courseName) {
      alert("Please select a course first.");
      return;
    }

    const enrollmentYear = new Date().getFullYear();
    const sequenceNumber = Math.floor(Math.random() * 10000);
    const year = enrollmentYear.toString().slice(-2);
    const paddedSeq = sequenceNumber.toString().padStart(4, "0");
    const generatedId = `${courseName}${year}${paddedSeq}`;
    setStudentId(generatedId);
  };

  const courses = {
    BCA: {
      name: "BCA",
      hasSemesters: true,
      fees: 9000,
      registerationFee: 5000,
    },
    MCA: {
      name: "MCA",
      hasSemesters: true,
      fees: 12000,
      registerationFee: 5000,
    },
    Professional: {
      name: "Professional",
      hasSemesters: false,
      subCourses: ["MERN", "AI", "ML"],
      subCourseFees: {
        MERN: { fees: 35000, registerationFee: 5000 },
        AI: { fees: 42000, registerationFee: 5000 },
        ML: { fees: 42000, registerationFee: 5000 },
      },
    },
  };

  const semesterOptions = {
    BCA: [1, 2, 3, 4, 5, 6],
    MCA: [1, 2, 3, 4],
  };

  // const generateFeeDetails = () => {
  //   let fees = 0;
  //   let registration = 0;
  //   let discountAmount = 0;
  //   if (studentExists) {
  //     discountAmount = Math.round(total * 0.05); // 5% discount
  //     total = total - discountAmount;
  //   }
  //   if (formDetails.courseName === "Professional") {
  //     const selectedSub =
  //       courses.Professional.subCourseFees[formDetails.subCourse];
  //     if (selectedSub) {
  //       fees = selectedSub.fees;
  //       registration = selectedSub.registerationFee;
  //     }
  //   } else {
  //     const course = courses[formDetails.courseName];
  //     if (course) {
  //       fees = course.fees;
  //       registration = course.registerationFee;
  //     }
  //   }

  //   let total = fees + registration;

  //   // // Apply 5% discount if student already exists
  //   // if (studentExists) {
  //   //   total *= 0.95;
  //   // }

  //   const amountRaw = Number(formDetails.amountReceived);
  //   const amountPaid = isNaN(amountRaw) ? 0 : amountRaw;
  //   let remaining = Math.max(total - amountPaid, 0);

  //   let emiInterest = 0;
  //   let emiMonthly = 0;
  //   if (
  //     formDetails.paymentOption === "emi" &&
  //     remaining > 0 &&
  //     formDetails.emi
  //   ) {
  //     const interestRate = 0.02;
  //     emiInterest = remaining * interestRate;
  //     const totalWithInterest = remaining + emiInterest;
  //     const tenureMonths = parseInt(formDetails.emi, 10);

  //     emiMonthly = Math.ceil(totalWithInterest / tenureMonths);
  //     remaining = totalWithInterest;
  //   }

  //   return {
  //     fees,
  //     registration,
  //     total: Math.round(total),
  //     amountPaid,
  //     remaining: Math.round(remaining),
  //     emiInterest,
  //     emiMonthly,
  //     discountAmount,
  //   };
  // };
  const generateFeeDetails = () => {
    let fees = 0;
    let registration = 0;

    if (formDetails.courseName === "Professional") {
      const selectedSub =
        courses.Professional.subCourseFees[formDetails.subCourse];
      if (selectedSub) {
        fees = selectedSub.fees;
        registration = selectedSub.registerationFee;
      }
    } else {
      const course = courses[formDetails.courseName];
      if (course) {
        fees = course.fees;
        registration = course.registerationFee;
      }
    }

    // 🟡 Calculate total before applying discount
    let originalTotal = fees + registration;

    // 🟢 Apply discount for existing students
    let discountAmount = 0;
    if (studentExists) {
      discountAmount = Math.round(originalTotal * 0.05); // 5%
    }

    // 🔵 Final total after discount
    let total = originalTotal - discountAmount;

    const amountRaw = Number(formDetails.amountReceived);
    const amountPaid = isNaN(amountRaw) ? 0 : amountRaw;
    let remaining = Math.max(total - amountPaid, 0);

    let emiInterest = 0;
    let emiMonthly = 0;
    if (
      formDetails.paymentOption === "emi" &&
      remaining > 0 &&
      formDetails.emi
    ) {
      const interestRate = 0.02;
      emiInterest = remaining * interestRate;
      const totalWithInterest = remaining + emiInterest;
      const tenureMonths = parseInt(formDetails.emi, 10);

      emiMonthly = Math.ceil(totalWithInterest / tenureMonths);
      remaining = totalWithInterest;
    }

    return {
      fees,
      registration,
      discountAmount,
      total: Math.round(total),
      amountPaid,
      remaining: Math.round(remaining),
      emiInterest,
      emiMonthly,
    };
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const {
      fees,
      registration,
      total,
      amountPaid,
      remaining,
      emiInterest,
      emiMonthly,
    } = generateFeeDetails();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fullName", formDetails.studentName);
      formData.append("dateOfBirth", formDetails.dateOfBirth);
      formData.append("gender", formDetails.gender);
      formData.append("email", formDetails.studentEmail);
      formData.append("phoneNo", formDetails.phoneNo);
      formData.append("address", formDetails.studentAddress);
      formData.append("guardianName", formDetails.guardianName);
      formData.append("guardianPhoneNo", formDetails.guardianPhoneNo);
      formData.append("courseType", formDetails.studyMode);
      formData.append("courseName", formDetails.courseName);
      formData.append("studentId", studentId);
      formData.append(
        "courseDuration",
        formDetails.courseName === "Professional"
          ? formDetails.subCourse
          : formDetails.semester
      );

      formData.append("courseFee", fees);
      formData.append("registrationFee", registration);
      formData.append("totalFee", total);
      formData.append("amountPaid", amountPaid);
      formData.append("remainingFee", remaining);
      formData.append("paymentMethod", formDetails.paymentOption);

      if (formDetails.paymentOption === "emi") {
        formData.append("emiTenure", formDetails.emi);
        formData.append("monthlyEmi", emiMonthly);
        formData.append("totalFeeWithInterest", remaining);
      }

      const response = await axios.post(
        "http://localhost:5000/student/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Student Details Added");
      handlePrint();

      // Reset form
      setFormDetails({
        studentName: "",
        dateOfBirth: "",
        gender: "",
        studentEmail: "",
        phoneNo: "",
        studentAddress: "",
        guardianName: "",
        guardianPhoneNo: "",
        courseName: "",
        semester: "",
        subCourse: "",
        studyMode: "",
        amountReceived: "",
        paymentOption: "",
        emi: "",
      });
      setFile("");
      setStudentId("");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    // printWindow.close();
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-auto bg-[#EFF1F8]">
      {/* Sidebar */}
      <div className="w-full md:w-[220px] bg-gradient-to-b from-purple-600 via-indigo-600 to-blue-700 fixed md:static h-[60px] md:h-screen z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="mt-[60px] md:mt-0 md:ml-[20px] w-full overflow-y-auto p-4 md:p-10">
        <div
          className="bg-[#FEFEFE] rounded-lg shadow-md p-4 md:p-8 mx-auto"
          ref={printRef}
        >
          <h2 className="text-2xl border-b font-semibold mb-6 text-indigo-700">
            Student Details
          </h2>

          <form onSubmit={submitHandler} className="space-y-6">
            {/* Upload Photo */}
            <div>
              <label
                htmlFor="studentPhoto"
                className="block text-gray-700 font-medium mb-2"
              >
                Upload Student Photo
              </label>
              {!previewUrl && (
                <input
                  type="file"
                  id="studentPhoto"
                  name="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                />
              )}
            </div>
            {previewUrl && (
              <div className="mb-4 relative inline-block">
                <img
                  src={previewUrl}
                  alt="Student"
                  className="w-40 h-40 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl("");
                    setFile("");
                  }}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  title="Remove Image"
                >
                  ×
                </button>
              </div>
            )}

            <div className="flex gap-2 items-end mb-4">
              <div className="w-full">
                <label className="block text-gray-700 font-medium mb-1">
                  Enter Student ID to Check (optional):
                </label>
                <input
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Enter student ID e.g., BCA250123"
                  className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <button
                type="button"
                onClick={checkStudentId}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer text-nowrap"
              >
                Check ID
              </button>
            </div>

            {/* Responsive Flex Grids */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Student Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Student Name:
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formDetails.studentName}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter student name"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Date of Birth:
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formDetails.dateOfBirth}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gender */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Gender:
                </label>
                <select
                  name="gender"
                  value={formDetails.gender}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Student Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Student Email:
                </label>
                <input
                  type="email"
                  name="studentEmail"
                  value={formDetails.studentEmail}
                  onChange={handleChange}
                  required
                  placeholder="Enter student email"
                  className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              {/* Student Phone No */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Student Phone No:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md px-4 h-10 focus-within:ring-2 focus-within:ring-indigo-400">
                  <span className="text-gray-700 select-none mr-2">+91</span>
                  <input
                    type="tel"
                    name="phoneNo"
                    value={formDetails.phoneNo}
                    onChange={handleChange}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    required
                    placeholder="Enter 10-digit number"
                    className="w-full outline-none"
                  />
                </div>
              </div>
              {/* Student Address */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Student Address:
                </label>
                <textarea
                  name="studentAddress"
                  value={formDetails.studentAddress}
                  onChange={handleChange}
                  required
                  placeholder="Enter student full address"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={3}
                />
              </div>
            </div>

            {/* Guardian Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2">
                Guardian Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Guardian Name:
                  </label>
                  <input
                    type="text"
                    name="guardianName"
                    value={formDetails.guardianName}
                    onChange={handleChange}
                    required
                    placeholder="Enter guardian name"
                    className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Guardian Phone No:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md px-4 h-10 focus-within:ring-2 focus-within:ring-indigo-400">
                    <span className="text-gray-700 select-none mr-2">+91</span>
                    <input
                      type="tel"
                      name="guardianPhoneNo"
                      value={formDetails.guardianPhoneNo}
                      onChange={handleChange}
                      maxLength={10}
                      pattern="[0-9]{10}"
                      required
                      placeholder="Enter 10-digit number"
                      className="w-full outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2">
                Course Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Course Name */}
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Course:
                  </label>
                  <select
                    name="courseName"
                    value={formDetails.courseName}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="" disabled>
                      Select Course
                    </option>
                    {Object.keys(courses).map((key) => (
                      <option key={key} value={key}>
                        {courses[key].name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sub Course for Professional */}
                {formDetails.courseName === "Professional" && (
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Specialization:
                    </label>
                    <select
                      name="subCourse"
                      value={formDetails.subCourse}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    >
                      <option value="" disabled>
                        Select Specialization
                      </option>
                      {courses.Professional.subCourses.map((sub) => (
                        <option key={sub} value={sub}>
                          {sub}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Semester if applicable */}
                {formDetails.courseName &&
                  courses[formDetails.courseName]?.hasSemesters && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Semester:
                      </label>
                      <select
                        name="semester"
                        value={formDetails.semester}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        <option value="" disabled>
                          Select Semester
                        </option>
                        {semesterOptions[formDetails.courseName].map((sem) => (
                          <option key={sem} value={sem}>
                            {sem}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
              </div>

              {/* Study Mode */}
              <div className="w-full md:w-1/2">
                <label className="block text-gray-700 font-medium mb-1">
                  Study Mode:
                </label>
                <select
                  name="studyMode"
                  value={formDetails.studyMode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="" disabled>
                    Select Study Mode
                  </option>
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>
            </div>

            {/* Fee Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-indigo-700 border-b pb-2">
                Fee Details
              </h2>

              {/* Generate ID */}
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={generateStudentId}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-fit cursor-pointer"
                >
                  Generate Student ID
                </button>
                {studentId && (
                  <p className="text-indigo-700 font-medium">
                    Generated ID:{" "}
                    <span className="font-semibold">{studentId}</span>
                  </p>
                )}
              </div>

              {/* Payment & EMI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Amount Received:
                  </label>
                  <input
                    type="number"
                    name="amountReceived"
                    value={formDetails.amountReceived || ""}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Payment Option:
                  </label>
                  <select
                    name="paymentOption"
                    value={formDetails.paymentOption}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="" disabled>
                      Select Payment Method
                    </option>
                    <option value="cash">Cash</option>
                    <option value="emi">EMI</option>
                  </select>
                </div>
              </div>

              {formDetails.paymentOption === "emi" && (
                <div className="w-full md:w-1/2">
                  <label className="block text-gray-700 font-medium mb-1">
                    EMI Tenure:
                  </label>
                  <select
                    name="emi"
                    value={formDetails.emi}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 h-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="" disabled>
                      Select Tenure
                    </option>
                    <option value="3">3 months</option>
                    <option value="6">6 months</option>
                    <option value="9">9 months</option>
                    <option value="12">12 months</option>
                    <option value="18">18 months</option>
                    <option value="24">24 months</option>
                  </select>
                </div>
              )}
            </div>

            {/* Fee Breakdown */}
            {formDetails.courseName && (
              <div className="pt-6 text-gray-800">
                <h3 className="text-xl font-semibold pb-2">
                  Course Fee Breakdown:
                </h3>
                {(() => {
                  const {
                    fees,
                    registration,
                    total,
                    amountPaid,
                    remaining,
                    emiInterest,
                    emiMonthly,
                    discountAmount,
                  } = generateFeeDetails();
                  return (
                    <ul className="list-disc ml-6 space-y-2 text-lg">
                      <li>Course Fee: ₹{fees}</li>
                      <li>Registration Fee: ₹{registration}</li>
                      {studentExists && discountAmount > 0 && (
                        <li className="text-green-600 font-medium">
                          Returning Student Discount (5%): -₹{discountAmount}
                        </li>
                      )}

                      <li>Total Fee: ₹{total}</li>
                      <li>Amount Paid: ₹{amountPaid}</li>
                      <li className="font-semibold text-red-600">
                        Remaining: ₹{remaining}
                      </li>
                      {formDetails.paymentOption === "emi" && (
                        <>
                          <li>Interest (2%): ₹{emiInterest.toFixed(2)}</li>
                          <li className="text-green-700 font-medium">
                            Monthly EMI: ₹{emiMonthly}
                          </li>
                        </>
                      )}
                    </ul>
                  );
                })()}
              </div>
            )}

            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pt-6">
              <button
                type="submit"
                className="bg-indigo-700 text-white px-6 py-2 rounded hover:bg-indigo-800 transition-all"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Student;
