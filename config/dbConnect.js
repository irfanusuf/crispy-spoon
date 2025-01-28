

const mongoose = require("mongoose");
const url = "mongodb+srv://irfanusuf33:stylehouse4424@stylehouse.rcc8j.mongodb.net/ML-program?retryWrites=true&w=majority&appName=stylehouse"


const connectDB = async () => {
  try {

  await  mongoose.connect(url)
  console.log("Database Connected !")

  } catch (err) {
    console.log(err);
  }
};

module.exports = {connectDB};
 