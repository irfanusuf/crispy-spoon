// Define decision trees as functions
function checkLength(password) {
  return password.length >= 8 ? 1 : 0; // 1 = strong, 0 = weak
}

function checkUppercase(password) {
  return /[A-Z]/.test(password) ? 1 : 0;
}

function checkLowercase(password) {
  return /[a-z]/.test(password) ? 1 : 0;
}

function checkDigits(password) {
  return /[0-9]/.test(password) ? 1 : 0;
}

function checkSpecialCharacters(password) {
  return /[!@#$%^&*]/.test(password) ? 1 : 0;
}

//  (Random Forest-inspired logic)
function evaluatePasswordStrength(password) {
  const trees = [
    checkLength,
    checkUppercase,
    checkLowercase,
    checkDigits,
    checkSpecialCharacters,
  ];

  const score = trees.reduce((acc, tree) => acc + tree(password), 0);

  if (score === 5) return "very-strong";
  if (score === 4) return "strong";
  if (score === 3) return "medium";
  if (score === 2) return "weak";
  return "very weak";
}

const randomForestController = async (req, res) => {
  try {
    const { password } = req.body;
    const randonForestValidation = evaluatePasswordStrength(password);

    return res.status(400).json({ error: randonForestValidation });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { randomForestController };
