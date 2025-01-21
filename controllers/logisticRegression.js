const weights = {
    length: 0.3,
    hasUppercase: 1.3,
    hasLowercase: 0.1,
    hasDigits: 0.2,
    hasSpecialChars: 1.0,
  };
  const intercept = -3;
  
  function extractFeatures(password) {
    return {
      length: password.length,
      hasUppercase: /[A-Z]/.test(password) ? 1 : 0,
      hasLowercase: /[a-z]/.test(password) ? 1 : 0,
      hasDigits: /[0-9]/.test(password) ? 1 : 0,
      hasSpecialChars: /[!@#$%^&*]/.test(password) ? 1 : 0,
    };
  }
  

  function predictPasswordStrength(features) {
    let score = intercept;
  
    for (const [feature, value] of Object.entries(features)) {
      score += weights[feature] * value;
    }
  
    return score;
  }
  
  // Strength evaluation
  // function evaluatePasswordStrength(score) {
  //   if (score >= 5) return "strong";
  //   if (score >= 4) return "medium";
  //   return "weak";
  // }
  
  function normalizeToRange(score) {
    const sigmoid = 1 / (1 + Math.exp(-score));
    return Math.round(sigmoid * 100);
  }
  const logisiticRegressionController = async (req, res) => {
    try {
      const { password } = req.body;
  
      const features = extractFeatures(password);
      const strengthScore = predictPasswordStrength(features);
      const normalizedScore = normalizeToRange(strengthScore);
  
      return res.json({ regressionScore: normalizedScore });
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };
  
  module.exports = { logisiticRegressionController };
  