// Feature extraction function
function extractFeatures(password) {
  return {
    length: password.length,
    hasUppercase: /[A-Z]/.test(password) ? 1 : 0,
    hasLowercase: /[a-z]/.test(password) ? 1 : 0,
    hasDigits: /[0-9]/.test(password) ? 1 : 0,
    hasSpecialChars: /[!@#$%^&*]/.test(password) ? 1 : 0,
  };
}

// Decision tree logic
function decisionTreePredict(features) {
  const { length, hasUppercase, hasLowercase, hasDigits, hasSpecialChars } = features;

  // Short passwords (less than 8 characters) are always weak
  if (length < 8) {
    return 2.0;  // weak password score for very short passwords
  }

  // Base score for passwords of decent length (8+ characters)
  let score = 4.0;  // default base score for medium passwords
  
  // Reward for password length
  if (length > 12) score += 2;  // Long passwords (12+ characters) get an extra boost
  
  // Add points for features
  score += hasUppercase ? 1 : 0;  // Add 1 if uppercase letters are present
  score += hasLowercase ? 1 : 0;  // Add 1 if lowercase letters are present
  score += hasDigits ? 1 : 0;     // Add 1 if digits are present
  score += hasSpecialChars ? 2 : 0; // Special characters have more weight

  // We ensure that having a mix of different types of characters is rewarded
  if (hasUppercase && hasLowercase && hasDigits && hasSpecialChars) {
    score += 2;  // Highly diverse passwords are the strongest
  }

  // Lower the score for overly simplistic combinations
  if (!hasUppercase && !hasLowercase) {
    score -= 1;  // If there's no case variation, penalize the score
  }

  return score;
}


// Normalize to range
function normalizeToRange(score) {
  const sigmoid = 1 / (1 + Math.exp(-score));
  return Math.round(sigmoid * 100);
}

// Controller logic
const decisionTreeController = async (req, res) => {
  try {
    const { password } = req.body;

    

    const features = extractFeatures(password);
    const treeScore = decisionTreePredict(features);
    const normalizedScore = normalizeToRange(treeScore);

    return res.json({ decisionTreeScore: normalizedScore });
  } catch (error) {
    console.error("Error in Decision Tree Controller:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {decisionTreeController};
