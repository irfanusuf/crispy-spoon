const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const registerHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || email === "") {
      return res.json({
        success: false,
        message: "Email Feild is required!",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "User Already Exists" });
    }

    const newUser = User.create({ username: "", email, password: "" });

    if (newUser) {
      res.json({
        success: true,
        message: "Email Stored. kindly proceed!",
      });
    } else {
      res.json({
        success: false,
        message: "Some Error",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: "Some Error",
    });
  }
};

const registerPassHandler = async (req, res) => {
  try {
    const { email } = req.query;
    const { password } = req.body;


    const user = await User.findOne({ email });

    const passcrypt = await bcrypt.hash(password, 10);


    if (user) {
      user.password = passcrypt;
      await user.save();
      return res.json({
        success: true,
        message: "User Account created Succesfully!",
      });
    } else {
      return res.json({
        success: false,
        message: "Password Check Succesfull",
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: "Server Error | 500",
    });
  }
};

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const SECRET_KEY = "hithsudanxygniyg$%^&"

    if (email === "" || password === "") {
      return res.json({
        success: false,
        message: "All feilds are necessary!",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "No User Found!",
      });
    }

    if (user.isAdmin === false) {
      return res.json({
        success: false,
        message: "Only Admin can Login!",
      });
    }

   const userId = user._id
    if (await bcrypt.compare(password, user.password)) {


      const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "15m" });

      res.cookie("authToken", token, {
        httpOnly: true,   
        secure: true,     
        maxAge: 15 * 60 * 1000, 
        sameSite: "Strict", 
      });

      return res.json({
        success: true,
        message: "Login Succesfull!",
      });
    } else {
      return res.json({
        success: false,
        message: "PassWord Incorrect!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getAllUSerHandler = async (req, res) => {
  try {
    const users = await User.find();
   

    if (users.length > 0) {
      return res.json({
        success: true,
        message: `${users.length} users found`,
        payload: users,
      });
    } else {
      return res.json({
        success: false,
        message: `${users.length} users found`,
      });
    }
  } catch (error) {
    console.error(error.message);
    return res.json({
      success: false,
      message: "Server Error | 500",
    });
  }
};
module.exports = { registerHandler, registerPassHandler, loginHandler , getAllUSerHandler};
