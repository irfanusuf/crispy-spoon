// Feature extraction function remains the same
function extractFeatures(password) {
  return {
    length: password.length,
    hasUppercase: /[A-Z]/.test(password) ? 1 : 0,
    hasLowercase: /[a-z]/.test(password) ? 1 : 0,
    hasDigits: /[0-9]/.test(password) ? 1 : 0,
    hasSpecialChars: /[!@#$%^&*]/.test(password) ? 1 : 0,
  };
}

// More complex random forest logic
function randomForestPredict(features) {
  const trees = [
    {
      intercept: -3.5,
      predict: (features) => {
        // Use a subset of features
        return features.length * 0.4 + features.hasSpecialChars * 2.5;
      },
    },
    {
      intercept: -2.8,
      predict: (features) => {
        // Use a different subset of features
        return (
          features.hasUppercase * 1.8 +
          features.hasDigits * 0.6 +
          features.hasLowercase * 0.3
        );
      },
    },
    {
      intercept: -3.2,
      predict: (features) => {
        // Add non-linear logic for more complexity
        const score =
          features.length > 10
            ? 2.0
            : features.hasDigits && features.hasSpecialChars
            ? 1.5
            : 1.0;
        return score + features.hasUppercase * 1.5;
      },
    },
    {
      intercept: -4.0,
      predict: (features) => {
        // Randomize weight slightly for variability
        const randomFactor = Math.random() * 0.5 + 1.0; // Random between 1.0 and 1.5
        return (
          features.hasLowercase * 0.5 +
          features.hasDigits * 0.7 +
          features.hasSpecialChars * 2.0 * randomFactor
        );
      },
    },
  ];

  // Get predictions from all trees
  const scores = trees.map((tree) => {
    return tree.intercept + tree.predict(features);
  });

  // Average the scores from all trees
  const averageScore = scores.reduce((acc, score) => acc + score, 0) / scores.length;

  // Normalize the average score
  const sigmoid = 1 / (1 + Math.exp(-averageScore));
  return Math.round(sigmoid * 100);
}

// Controller logic
const randomForestController = async (req, res) => {
  try {
    const { password } = req.body;

    // Validate input
  

    const features = extractFeatures(password);
    const normalizedScore = randomForestPredict(features);

    return res.json({ randomForestScore: normalizedScore });
  } catch (error) {
    console.error("Error in Random Forest Controller:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {randomForestController};
