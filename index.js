const express = require("express");
const cors = require("cors")
const { decisionTreeController } = require("./controllers/decisionTree");
const { randomForestController } = require("./controllers/randomForest");
const { logisiticRegressionController } = require("./controllers/logisticRegression");
const { passwordResemblanceController } = require("./controllers/similarityController");



const app = express();
app.use(express.json());
app.use(cors())




app.post("/check/regression" , logisiticRegressionController)

app.post("/check/decision" , decisionTreeController)

app.post("/check/randomForest" , randomForestController)


app.post("/check/similarity" , passwordResemblanceController)





// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});










