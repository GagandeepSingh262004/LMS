const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      // required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    email: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    guardian: {
      guardianName: {
        type: String,
        required: true,
      },
      guardianPhoneNo: {
        type: String,
        required: true,
      },
    },
    courseType: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    courseDuration: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    courseFee: {
      type: String,
      required: true,
    },
    registerationFee: {
      type: String,
    },
    totalFee: {
      type: String,
    },
    amountPaid: {
      type: String,
    },
    remainingFee: {
      type: String,
    },
    monthlyEmi: {
      type: String,
    },
  },
  { timestamps: true }
);
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
