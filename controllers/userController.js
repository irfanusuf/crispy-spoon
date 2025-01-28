const { User } = require("../models/userModel");

const registerHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || email === "") {
      return res.json({
        success: false,
        message: "Username Feild is required!",
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
        message: "User Created!",
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

module.exports = { registerHandler };
