

// Linear regression weights (manually defined)
const weights = {
  length: 0.3,           // Weight for password length
  hasUppercase: 1.3,     // Weight for uppercase letters
  hasLowercase: 0.5,     // Weight for lowercase letters
  hasDigits: 0.5,        // Weight for digits
  hasSpecialChars: 2.0,  // Weight for special characters
};
const intercept = -3; // Bias term to adjust the final score

// Function to extract password features
function extractFeatures(password) {
  return {
    length: password.length,
    hasUppercase: /[A-Z]/.test(password) ? 1 : 0,
    hasLowercase: /[a-z]/.test(password) ? 1 : 0,
    hasDigits: /[0-9]/.test(password) ? 1 : 0,
    hasSpecialChars: /[!@#$%^&*]/.test(password) ? 1 : 0,
  };
}

// Linear regression prediction
function predictPasswordStrength(features) {
  let score = intercept;

  // Sum up weighted features
  for (const [feature, value] of Object.entries(features)) {
    score += weights[feature] * value;
  }

  return score;
}

// Strength evaluation
function evaluatePasswordStrength(score) {
  if (score >= 5) return "strong";
  if (score >= 4) return "medium";
  return "weak";
}

// Register handler
const linearReggressionController =  async (req, res) => {

  try {
   

    const {password } = req.body;

    // Evaluate password
    const features = extractFeatures(password);
    const strengthScore = predictPasswordStrength(features);
    const strength = evaluatePasswordStrength(strengthScore);
  
   
      return res.status(400).json({ error: `Password is ${strength}` });
    
  
 
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}


module.exports ={linearReggressionController}