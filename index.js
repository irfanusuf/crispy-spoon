const express = require("express");
const cors = require("cors")
const { decisionTreeController } = require("./controllers/decisionTree");
const { randomForestController } = require("./controllers/randomForest");
const { linearReggressionController } = require("./controllers/linearRegression");

const app = express();
app.use(express.json());
app.use(cors())




app.post("/check/regression" , linearReggressionController)

app.post("/check/decision" , decisionTreeController)

app.post("/check/randomForest" , randomForestController)





// Start server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});










