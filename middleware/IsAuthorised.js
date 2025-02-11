

const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");



const IsAuthorised=  (req, res , next) => {
    // const token = req.cookies.authToken;
    const token = req.query.token
    const SECRET_KEY = "hithsudanxygniyg$%^&"
    
  
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token found" });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.user = decoded.userId
      next()
    } catch (err) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  };


 
  const getAuthenticated  =  async (req, res , next) => {
    // const token = req.cookies.authToken;
    const token = req.query.token

  
    const SECRET_KEY = "hithsudanxygniyg$%^&"
    
  
    if (!token) {
      return res.status(401).json({success : false});
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(decoded.userId)
    

      res.json({success : true , email  : user.email})
 
    } catch (err) {
      console.log(err)
      res.status(403).json({success : false});
    }
  };


  module.exports = {IsAuthorised , getAuthenticated}