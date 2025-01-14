const bcrypt = require("bcrypt");

// decison tree function

function validatePassword(password) {
  if (password.length < 8) {
    return {
      isValid: false,
      reason: "Password must be at least 8 characters long.",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      reason: "Password must contain at least one uppercase letter.",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      reason: "Password must contain at least one lowercase letter.",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      reason: "Password must contain at least one digit.",
    };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return {
      isValid: false,
      reason:
        "Password must contain at least one special character (!@#$%^&*).",
    };
  }

  // Simulate regression
  const score =
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[a-z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[!@#$%^&*]/.test(password) ? 1 : 0);

  if (score < 4) {
    return {
      isValid: false,
      reason: "Password does not meet complexity requirements.",
    };
  }

  return { isValid: true, reason: "Your Password is Following All set of rules  " };
}

const decisionTreeController = async (req, res) => {
  try {
    const { password } = req.body;

    const validation = validatePassword(password);

   
      return res.status(400).json({ message: validation.reason });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { decisionTreeController };
