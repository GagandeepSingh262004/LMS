import { useRef } from "react";
// import logo from "../formpreview/logo_white.png";

const FormWithPreview = ({
  formData,
  remainingBalance,
  processingFees,
  emiAmount,
}) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const win = window.open("", "", "height=800,width=1000");
    win.document.write(`
      <html>
        <head>
          <title>Admit Card</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
          <style>
            body { font-family: Arial; padding: 40px; font-size: 14px; }
            .header-title { font-size: 22px; font-weight: bold; }
            .sub-title { font-size: 16px; margin-bottom: 20px; }
            .logo { width: 80px; }
            .section-box { border: 1px solid #ccc; padding: 15px; margin-bottom: 20px; border-radius: 8px; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #999; padding-bottom: 5px; }
            .info-label { font-weight: bold; }
            .photo { width: 100px; height: 120px; object-fit: cover; border: 1px solid #ddd; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    win.print();
    win.close();
  };

  return (
    <div className="container" ref={printRef}>
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-title">BIIT PLUS Institute</div>
        <div className="sub-title">Admit Card / Enrollment Slip</div>
      </div>

      <div className="d-flex justify-content-between align-items-start mb-3">
        <div className="w-75">
          <div className="section-box">
            <div className="section-title">Student Information</div>
            <p>
              <span className="info-label">Name:</span> {formData.name}
            </p>
            <p>
              <span className="info-label">DOB:</span> {formData.dob}
            </p>
            <p>
              <span className="info-label">Gender:</span> {formData.gender}
            </p>
            <p>
              <span className="info-label">Phone:</span> {formData.phone}
            </p>
            <p>
              <span className="info-label">Email:</span> {formData.email}
            </p>
            <p>
              <span className="info-label">Address:</span> {formData.address}
            </p>
          </div>
        </div>
        <div className="w-25 text-end">
          <img
            src={`http://localhost:5000/${formData.photo}`}
            alt="Student"
            className="photo"
          />
        </div>
      </div>

      <div className="section-box">
        <div className="section-title">Course Details</div>
        <p>
          <span className="info-label">Course Name:</span> {formData.courseName}
        </p>
        <p>
          <span className="info-label">Duration:</span>{" "}
          {formData.courseDuration}
        </p>
        <p>
          <span className="info-label">Mode:</span> {formData.mode}
        </p>
      </div>

      <div className="section-box">
        <div className="section-title">Fee Summary</div>
        <p>
          <span className="info-label">Total Fees:</span> ₹{formData.totalFees}
        </p>
        <p>
          <span className="info-label">Registration Fees:</span> ₹
          {formData.registrationFees}
        </p>
        <p>
          <span className="info-label">Paid Fees:</span> ₹{formData.paidFees}
        </p>
        <p>
          <span className="info-label">Remaining Balance:</span> ₹
          {remainingBalance}
        </p>
        <p>
          <span className="info-label">Processing Fees:</span> ₹{processingFees}
        </p>
        <p>
          <span className="info-label">EMI Tenure:</span> {formData.emiTenure}{" "}
          months
        </p>
        <p>
          <span className="info-label">Monthly EMI:</span> ₹{emiAmount}
        </p>
      </div>

      <div className="section-box">
        <div className="section-title">Subjects Assigned</div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Subject</th>
              <th>Type</th>
              <th>Credits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>HTML & CSS Basics</td>
              <td>Theory</td>
              <td>4</td>
            </tr>
            <tr>
              <td>2</td>
              <td>JavaScript Intermediate</td>
              <td>Theory</td>
              <td>4</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ReactJS Project</td>
              <td>Project</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormWithPreview;
