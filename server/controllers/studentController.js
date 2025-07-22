const Student = require("../models/Student");

const registerStudent = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      email,
      phoneNo,
      address,
      guardianName,
      guardianPhoneNo,
      courseType,
      courseName,
      courseDuration,
      studentId,
      courseFee,
      registrationFee,
      totalFee,
      amountPaid,
      remainingFee,
      paymentMethod,
      monthlyEmi,
      totalFeeWithInterest,
    } = req.body;
    const guardian = {
      guardianName,
      guardianPhoneNo,
    };
    console.log("Received body:", req.body);
    // Basic validation
    if (
      !fullName ||
      !dateOfBirth ||
      !gender ||
      !email ||
      !phoneNo ||
      !address ||
      !guardian.guardianName ||
      !guardian.guardianPhoneNo ||
      !courseType ||
      !courseName ||
      !courseDuration ||
      !studentId ||
      !paymentMethod ||
      !courseFee ||
      !amountPaid
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const duplicate = await Student.findOne({
      studentId,
    });
    if (duplicate) {
      return res.status(400).json({ message: "Student already registered" });
    }

    const studentObj = {
      image: req.file?.filename,
      fullName,
      dateOfBirth,
      gender,
      email,
      phoneNo,
      address,
      guardian,
      courseType,
      courseName,
      courseDuration,
      studentId,
      paymentMethod,
      courseFee: Number(courseFee),
      registrationFee: Number(registrationFee || 0),
      totalFee: Number(totalFee || 0),
      amountPaid: Number(amountPaid),
      remainingFee: Number(remainingFee || 0),
    };

    if (paymentMethod === "emi") {
      studentObj.monthlyEmi = Number(monthlyEmi || 0);
      studentObj.totalFeeWithInterest = Number(totalFeeWithInterest || 0);
    }

    const student = new Student(studentObj);
    await student.save();

    res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    if (!students.length) {
      return res.status(400).json({ message: "No Student found" });
    }
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const checkId = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId || typeof studentId !== "string") {
      return res.status(400).json({ valid: false, message: "Invalid ID" });
    }

    const check = await Student.findOne({ studentId });

    if (!check) {
      return res
        .status(200)
        .json({ valid: false, message: "Student ID not found" });
    }

    return res.status(200).json({ valid: true, student: check });
  } catch (error) {
    console.error("Error checking student ID:", error);
    return res
      .status(500)
      .json({ valid: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  registerStudent,
  getAllStudents,
  checkId,
};
