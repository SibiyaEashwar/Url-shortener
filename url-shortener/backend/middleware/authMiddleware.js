const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
       console.log("TOKEN:", token);
    console.log("SECRET:", process.env.JWT_SECRET);
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } else {
      res.status(401).json({
        message: "Not authorized",
      });
    }
  } catch (error) {
  console.log(error);

  res.status(401).json({
    message: "Invalid token",
  });
}
};

module.exports = { protect };