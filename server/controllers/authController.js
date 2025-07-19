const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { fName, lName, email, password } = req.body;
    if (!fName || !lName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const duplicate = await Admin.findOne({ email });
    if (duplicate) {
      return res.status(400).json({ error: "Email is already exists" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const adminObj = {
      fName,
      lName,
      email,
      password: hashPass,
    };
    const admin = new Admin(adminObj);
    await admin.save();
    if (admin) {
      return res.status(200).json({ message: "Admin Successfully Created" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invaild Details Entered" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invaild Details Entered" });
    }
    const accessToken = jwt.sign(
      {
        id: admin._id,
      },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: admin._id },
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      // secure: process.env.NODE_ENV === "production", // Only set secure flag for production
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const refresh = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const refreshToken = cookies.jwt;
    if (!refreshToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      async (err, decode) => {
        try {
          if (err) {
            return res.status(401).json({ message: "Forebidden" });
          }
          const foundAdmin = await Admin.findOne({ _id: decode.id });
          if (!foundAdmin) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          const accessToken = jwt.sign(
            { id: foundAdmin._id, email: foundAdmin.email },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "15m" }
          );
          res.json(accessToken);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies || !cookies.jwt) {
      return res.status(200).json({ message: "No cookie to clear" });
    }
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.json({ message: "Cookie Cleared Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  register,
  login,
  refresh,
  logout,
};
