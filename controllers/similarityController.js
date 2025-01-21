const { commonPasswords } = require("../passLibrary"); 

let similarityCount;

function getSimilarity(password, commonPasswords) {
  commonPasswords.forEach((commonPassword) => {
    if (password === commonPassword) {
      return (similarityCount = 1);
    }
  });
}
const passwordResemblanceController = async (req, res) => {
  try {
    const { password } = req.body;

    console.log(password);

    if (password.length < 8) {
      return res.json({
        score: 1,
        message: "Password length less than 8",
      });
    }
    getSimilarity(password, commonPasswords.passwords);

    console.log("similarity count : " + `${similarityCount}`);

    if (similarityCount > 0) {
      similarityCount = 0;
      return res.json({
        score: 1,
        message:
          "Common password detected. Please choose a more secure password.",
      });
    } else {
      return res.json({
        score: 100,
      });
    }
  } catch (error) {
    console.error("Error checking password:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = { passwordResemblanceController };
